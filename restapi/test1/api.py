from flask import Flask, request
from flask_restful import Resource, Api
import numpy as np
import cv2

app = Flask(__name__)
api = Api(app)


class image(Resource):
    def post(self):
        r = request
        print(r)
        nparr = np.fromstring(r.data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        img = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
        _, img_encoded = cv2.imencode(".jpg", img)
        data_encode = np.array(img_encoded)
        str_encode = data_encode.tostring()
        print(type(str_encode))
        nparr = np.fromstring(str_encode, np.uint8)
        lists = nparr.tolist()
        return {"status": lists}


api.add_resource(image, "/api")
if __name__ == "__main__":
    app.run()
