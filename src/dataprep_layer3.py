import os
import cv2

files = os.listdir("dataset")

# preprocessing images

for label in files:
    images = os.listdir("dataset" + "\\" + label)
    i = 0
    print(label)
    for j in range(len(images)):
        # print(i,'dataset' + '\\' + label + '\\' + images[i])
        try:
            img = cv2.imread("dataset" + "\\" + label + "\\" + images[i])

            r, c, h = img.shape
            if r < 64 or c < 64:
                os.remove("dataset" + "\\" + label + "\\" + images[i])
        except:
            pass
        i += 1

# list out images data
root = "dataset"
files = os.listdir(root)
total = 0
for label in files:
    no_images = len(os.listdir(root + "\\" + label))
    total += no_images
    print(label + ": ", no_images)
print("Total images: ", total)
