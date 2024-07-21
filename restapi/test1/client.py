from __future__ import print_function
import requests
import json
import cv2
import numpy as np

addr = "http://localhost:5000"
test_url = addr + "/api"

# prepare headers for http request
content_type = "image/jpeg"
headers = {"content-type": content_type}

img = cv2.imread("me.jpg")
# encode image as jpeg
_, img_encoded = cv2.imencode(".jpg", img)
# send http request with image and receive response
response = requests.post(test_url, data=img_encoded.tostring(), headers=headers)
s = response.text
p = json.loads(s)
s1 = p["status"]

res1 = np.asarray(s1)
nprr = np.asarray(res1)
nprr = nprr.astype("uint8")

# decode response
imgs = cv2.imdecode(nprr, cv2.IMREAD_COLOR)
cv2.imshow("ds", imgs)
cv2.waitKey(0)
