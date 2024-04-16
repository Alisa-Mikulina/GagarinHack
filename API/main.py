from fastapi import FastAPI, File, UploadFile, Body
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import cv2
import base64
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
from easyocr import Reader
import re

from consts import *
from models import *


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def crop_image(image, box):
    img_width, img_height = image.size
    x, y, w, h = box[0]
    left = max(0, int(x - w/2))
    upper = max(0, int(y - h/2))
    right = min(img_width, int(x + w/2))
    lower = min(img_height, int(y + h/2))
    
    cropped_image = image.crop((left, upper, right, lower))
    return cropped_image


def get_series_passport(im, predictions, rotate_class, classification, detailed, reader, results): # сюда картинку считанную через PIL и предсказания йоло
    for box in predictions[0].boxes:
        cropped_image = crop_image(im, box.xywh)
        if rotate_class == '0' and classification == 'personal_passport' and detailed == 'first_page': # обрати внимание что лейблы соответствуют
            cropped_image = cropped_image.transpose(Image.ROTATE_90)
        if rotate_class == '90':
            cropped_image = cropped_image.transpose(Image.ROTATE_270)
        if rotate_class == '180':
            cropped_image = cropped_image.transpose(Image.ROTATE_180)
        if rotate_class == '270':
            cropped_image = cropped_image.transpose(Image.ROTATE_90)    


        reading = reader.readtext(np.array(cropped_image), detail=0, paragraph=True)
        cnt = 0
        digits = ''.join(re.findall(r'\d', ''.join(reading)))

        if len(digits) == 4:
            results['series'] = digits
        elif len(digits) == 6:
            results['number'] = digits
            
    return results['series'], results['number']


def predict(cvimg, pilimg):

    # Classification by four types
    img_height = 512
    class_dict = ['driver_license', 'personal_passport', 'vehicle_passport', 'vehicle_certificate']
    image_resized = cv2.resize(cvimg, (img_height, img_height))
    img_classify = np.expand_dims(image_resized, axis=0)

    pred = classification_types_model.predict(img_classify)
    classification = class_dict[np.argmax(pred)]
    class_sure = max(pred[0])


    # find rotation angle
    class_dict = ['0','180','270','90']
    image_rotate = np.expand_dims(image_resized,axis=0)

    pred_rotate = rotate_model.predict(image_rotate)
    rotate_class = class_dict[np.argmax(pred_rotate)]


    # detailed classification
    detailed = False
    detailed_sure = False

    if classification == 'personal_passport':
        # Classification for passport
        class_dict = ['first_page','second_page']
        pred = passport_model.predict(img_classify)
        detailed = class_dict[np.argmax(pred)]
        detailed_sure = max(pred[0])
    
    elif classification == 'driver_license':
        # Classification for license
        class_dict = ['first_page','second_page']
        pred = license_model.predict(img_classify)
        detailed = class_dict[np.argmax(pred)]
        detailed_sure = max(pred[0])
    
    elif classification == 'vehicle_certificate':
        # Classification for sts
        class_dict = ['first_page','second_page']
        pred = sts_model.predict(img_classify)
        detailed = class_dict[np.argmax(pred)]
        detailed_sure = max(pred[0])
    
    elif classification == 'vehicle_passport':
        detailed = "first_page"
        

    # YOLO everything
    boxes = []
    output = chris_model.predict(source=pilimg)
    for i in range(len(output[0].boxes.xyxyn)):
        label = CLASSES[int(output[0].boxes.cls[i])]
        
        conf = output[0].boxes.conf[i]
        box = output[0].boxes.xyxyn[i]
        boxes.append({
            'label': label, 
            'confidence': conf.tolist(), 
            'box_coords': box.tolist()
                     })
    
    # text fetching
    reader = Reader(['ru', 'en']) 

    cropped_images = []
    results = {'series': '', 'number': ''}
    seria, number = get_series_passport(pilimg, output, rotate_class, classification, detailed, reader, results)

    return {"boxes": boxes,
            "class": classification,
            "class_sure": round(class_sure * 100, 2),
            "page": detailed,
            "page_sure": round(detailed_sure * 100, 2),
            "rotate_by": rotate_class,
            "seria": seria,
            "number": number}



@app.post("/detect/")
async def detect_classify(imageb64: str = Body(...)):

    image = base64.b64decode(imageb64)

    jpg_as_np = np.frombuffer(image, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=1)

    return predict(img)



@app.post("/detect/phone")
async def detect_classify(image: UploadFile = File(...)):

    cvimg = cv2.imread(image.file)
    pilimg = Image.open(image.file)

    return predict(cvimg, pilimg)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000, timeout_keep_alive=1000)
