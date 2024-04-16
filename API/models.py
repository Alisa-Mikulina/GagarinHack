import tensorflow as tf
from ultralytics import YOLO
from tensorflow import keras
from tensorflow.keras.layers import Dense,Flatten
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import load_model


chris_model = YOLO('chris_21_27.pt')

classification_types_model = load_model('model_clf.h5')

passport_model = load_model('model_page_passport.h5')
license_model = load_model('model_page_drive.h5')
sts_model = load_model('model_page_sts.h5')

rotate_model = load_model('model_rotate1.h5')