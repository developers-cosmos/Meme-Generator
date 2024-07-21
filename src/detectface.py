import cv2
import numpy as np


# pre processing image for model


def detectface(img):
    face_cascade = cv2.CascadeClassifier(
        "facedetection/haarcascade_frontalface_default.xml"
    )
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    if faces is ():
        return False
    for x, y, w, h in faces:
        roi_gray = img[y : y + h, x : x + w]
        cropped_img = np.expand_dims(
            np.expand_dims(cv2.resize(roi_gray, (224, 224)), -1), 0
        )
        return roi_gray
