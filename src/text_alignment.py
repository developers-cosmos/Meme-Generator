import random
import cv2
from PIL import Image, ImageDraw, ImageFont
import numpy as np


def lenghth(a):
    s = len(a)
    if s < 12:
        return 36
    elif s < 20:
        return 26
    else:
        return 48 - len(a)


def text_alignment(label, im):
    label = "memes/" + label + ".txt"
    f = open(label, "r")
    s = [x for x in f]
    # print(s)
    w = 300
    h = 300
    color = (255, 255, 255)
    dim = (w, h)
    a = random.choice(s)
    print(a)
    a = list(a.split("|"))
    shadowcolor = (0, 0, 0)
    try:
        im = cv2.resize(im, dim, interpolation=cv2.INTER_AREA)
        cv2_im_rgb = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
        pil_im = Image.fromarray(cv2_im_rgb)
        draw = ImageDraw.Draw(pil_im)
        font = ImageFont.truetype("font.ttf", 40)
        if len(a) == 1:
            org = 29 - len(a[0]) + 2, 230
            x, y = org
            fontScale = lenghth(a[0])
            font = ImageFont.truetype("font.ttf", fontScale)
            # thin border
            text = a[0][:-1]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[0][:-1], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
        elif len(a) == 2:
            org = 29 - len(a[0]) + 2, 7
            x, y = org
            fontScale = lenghth(a[0])
            font = ImageFont.truetype("font.ttf", fontScale)

            # thin border
            text = a[0]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[0], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
            org = 29 - len(a[1]) + 2, 230
            x, y = org
            fontScale = lenghth(a[1])
            font = ImageFont.truetype("font.ttf", fontScale)
            # thin border
            text = a[1]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[1], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
        elif len(a) == 3:
            org = 29 - len(a[0]) + 2, 7
            x, y = org
            fontScale = lenghth(a[0])
            font = ImageFont.truetype("font.ttf", fontScale)
            # thin border
            text = a[0]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[0], color, font=font)

            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
            org = 29 - len(a[1]) + 2, 210
            x, y = org
            fontScale = lenghth(a[1])
            font = ImageFont.truetype("font.ttf", fontScale)

            # thin border
            text = a[1]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[1], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
            org = 29 - len(a[2]) + 2, 239
            x, y = org

            fontScale = lenghth(a[2])
            font = ImageFont.truetype("font.ttf", fontScale)

            # thin border
            text = a[2][:-1]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[2][:-1], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
        else:
            org = 29 - len(a[0]) + 2, 7
            x, y = org
            fontScale = lenghth(a[0])
            font = ImageFont.truetype("font.ttf", fontScale)

            # thin border
            text = a[0]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[0], color, font=font)

            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
            org = 29 - len(a[1]) + 2, 40
            x, y = org
            fontScale = lenghth(a[1])
            font = ImageFont.truetype("font.ttf", fontScale)

            # thin border
            text = a[1]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[1], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
            org = 29 - len(a[2]) + 2, 220
            x, y = org
            fontScale = lenghth(a[2])
            font = ImageFont.truetype("font.ttf", fontScale)

            # thin border
            text = a[2]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text(org, a[2], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
            org = 29 - len(a[3]) + 2, 250
            x, y = org
            fontScale = lenghth(a[3])
            font = ImageFont.truetype("font.ttf", fontScale)

            # thin border
            text = a[3][:-1]
            draw.text((x - 1, y), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y), text, font=font, fill=shadowcolor)
            draw.text((x, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x, y + 1), text, font=font, fill=shadowcolor)

            # thicker border
            draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
            draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
            draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)

            draw.text(org, a[3][:-1], color, font=font)
            im = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)
        return im
    except Exception as e:
        print(e)
        img = cv2.imread("static/dontdelete/wrong.jpg")
        img = cv2.resize(img, (300, 300))
        return img
