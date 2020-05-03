import pandas as pd
from PIL import Image
import numpy as np

# read image pixel values from csv file

df = pd.read_csv('dataset.csv')

labels = df.iloc[:,0]

pixels = df.iloc[:,2]

from PIL import Image
for i in range(35887):
    s = str(pixels[i])
    data = s.split()
    l=[]
    p= []
    for x in data:
        l.append(x)
        if len(l)==48:
            p.append(l)
            l=[]
    array = np.array(p, dtype=np.uint8)

    # Use PIL to create an image from the new array of pixels
    new_image = Image.fromarray(array)
    new_image.save('data/' + str(labels[i]) + '/' + 'img' + str(i) + '.jpg')


import os
root = 'data2'
files = os.listdir(root)
total = 0
for label in files:
    no_images = len(os.listdir(root + "\\" + label))
    total += no_images
    print(label+": ",no_images)
print("Total images: ",total)