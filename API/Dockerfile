FROM python:3.8.10

WORKDIR /app/
ADD requirements.txt .
RUN pip install -r requirements.txt

ADD . .

EXPOSE 8000
CMD python main.py