import os
import unittest
import numpy as np

# Ensure src is on the path
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.detectface import detectface

class DetectFaceNoFaceTest(unittest.TestCase):
    def test_no_face_returns_false(self):
        # Create a blank image with no faces
        img = np.zeros((224, 224, 3), dtype=np.uint8)
        # Change working directory so cascade path resolves
        cwd = os.getcwd()
        try:
            os.chdir(os.path.join(cwd, 'restapi', 'memegen'))
            self.assertFalse(detectface(img))
        finally:
            os.chdir(cwd)

if __name__ == '__main__':
    unittest.main()
