import io
import os
import json
import unittest
import app

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "../../images")
import cv2
import numpy as np
import xmlrunner
import re


class TestDataObjects(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        "set up test fixtures"
        print("### Setting up flask server ###")
        app.app.testing = True
        self.app = app.app.test_client()

    @classmethod
    def tearDownClass(self):
        "tear down test fixtures"
        print("### Tearing down the flask server ###")

    def test_01_jpg(self):
        """Test file upload: POST"""
        addr = "http://localhost:5000"
        test_url = addr + "/api"
        content_type = "image/jpeg"
        headers = {"content-type": content_type}
        img = cv2.imread(os.path.join(IMAGES_DIR, "meme1.jpeg"))
        _, img_encoded = cv2.imencode(".jpg", img)
        response = self.app.post(test_url, data=img_encoded.tostring(), headers=headers)
        s = response.get_data(as_text=True)
        p = json.loads(s)
        s1 = p["status"]
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(len(s1), 0)

    def test_02_jpeg(self):
        """Test file upload: POST"""
        addr = "http://localhost:5000"
        test_url = addr + "/api"
        content_type = "image/jpeg"
        headers = {"content-type": content_type}
        img = cv2.imread(os.path.join(IMAGES_DIR, "meme2.jpeg"))
        _, img_encoded = cv2.imencode(".jpg", img)
        response = self.app.post(test_url, data=img_encoded.tostring(), headers=headers)
        s = response.get_data(as_text=True)
        p = json.loads(s)
        s1 = p["status"]
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(len(s1), 0)

    def test_03_png(self):
        """Test file upload: POST"""
        addr = "http://localhost:5000"
        test_url = addr + "/api"
        content_type = "image/jpeg"
        headers = {"content-type": content_type}
        img = cv2.imread(os.path.join(IMAGES_DIR, "meme3.jpeg"))
        _, img_encoded = cv2.imencode(".jpg", img)
        response = self.app.post(test_url, data=img_encoded.tostring(), headers=headers)
        s = response.get_data(as_text=True)
        p = json.loads(s)
        s1 = p["status"]
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(len(s1), 0)

    def test_04_returntype_int_with_list(self):
        addr = "http://localhost:5000"
        test_url = addr + "/api"
        content_type = "image/jpeg"
        headers = {"content-type": content_type}
        img = cv2.imread(os.path.join(IMAGES_DIR, "meme3.jpeg"))
        _, img_encoded = cv2.imencode(".jpg", img)
        response = self.app.post(test_url, data=img_encoded.tostring(), headers=headers)
        s = response.get_data(as_text=True)
        p = json.loads(s)
        s1 = p["status"]
        c = str(type(s1[1]))
        c1 = str(type(s1))
        self.assertEqual(c1[6:-1], " 'list'")
        self.assertEqual(c[6:-1], " 'int'")

    def test_05_giving_null(self):
        addr = "http://localhost:5000"
        test_url = addr + "/api"
        content_type = "image/jpeg"
        headers = {"content-type": content_type}
        response = self.app.post(test_url, data=None, headers=headers)
        self.assertNotEqual(response.status_code, 200)

    def test_06_multipleinputs(self):
        addr = "http://localhost:5000"
        test_url = addr + "/api"
        content_type = "image/jpeg"
        headers = {"content-type": content_type}
        img = cv2.imread(os.path.join(IMAGES_DIR, "meme2.jpeg"))
        _, img_encoded = cv2.imencode(".jpg", img)
        response = self.app.post(test_url, data=img_encoded.tostring(), headers=headers)
        response1 = self.app.post(
            test_url, data=img_encoded.tostring(), headers=headers
        )
        response2 = self.app.post(
            test_url, data=img_encoded.tostring(), headers=headers
        )
        response3 = self.app.post(
            test_url, data=img_encoded.tostring(), headers=headers
        )
        response4 = self.app.post(
            test_url, data=img_encoded.tostring(), headers=headers
        )
        response5 = self.app.post(
            test_url, data=img_encoded.tostring(), headers=headers
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response4.status_code, 200)
        self.assertEqual(response5.status_code, 200)


if __name__ == "__main__":
    runner = xmlrunner.XMLTestRunner(output="test-reports")
    unittest.main(testRunner=runner)
    unittest.main()
