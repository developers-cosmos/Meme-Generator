from flask import Flask, request, render_template, jsonify
import base64
from io import BytesIO
import random
import numpy as np
from PIL import ImageFont, ImageDraw, Image
import werkzeug
import time
from datetime import datetime
import tensorflow as tf
import cv2

app = Flask(__name__)


def layer(path, labels, frame):
    d = {}
    interpreter = tf.lite.Interpreter(model_path=path)
    interpreter.allocate_tensors()

    # Get input and output tensors.
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]["index"], frame)
    interpreter.invoke()

    # The function `get_tensor()` returns a copy of the tensor data.
    # Use `tensor()` in order to get a pointer to the tensor.
    output_data = interpreter.get_tensor(output_details[0]["index"])
    for i in range(len(labels)):
        d[labels[i]] = output_data[0][i]
    return d


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
        font = ImageFont.truetype("1.ttf", 40)
        if len(a) == 1:
            org = 29 - len(a[0]) + 2, 230
            x, y = org
            fontScale = lenghth(a[0])
            font = ImageFont.truetype("1.ttf", fontScale)
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
            font = ImageFont.truetype("1.ttf", fontScale)

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
            font = ImageFont.truetype("1.ttf", fontScale)
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
            font = ImageFont.truetype("1.ttf", fontScale)
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
            font = ImageFont.truetype("1.ttf", fontScale)

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
            font = ImageFont.truetype("1.ttf", fontScale)

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
            font = ImageFont.truetype("1.ttf", fontScale)

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
            font = ImageFont.truetype("1.ttf", fontScale)

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
            font = ImageFont.truetype("1.ttf", fontScale)

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
            font = ImageFont.truetype("1.ttf", fontScale)

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


labels = ["happy", "disgust", "neutral", "sad", "fear", "anger", "surprise"]


@app.route("/")
def hello():
    return render_template("memslide.html")


from flask import Flask, request, render_template, send_file
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg"])
UPLOAD_FOLDER = "./static"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def hello_world():
    return render_template("memslide.html")


@app.route("/", methods=["POST"])
def upload_file():
    file = request.files.get("photo", None)

    if file and allowed_file(file.filename):
        now = datetime.now()
        now = str(now)[:-7]

        filename = secure_filename(file.filename)

        extension = filename.split(".")
        now = now + "." + extension[-1]
        now = now.split()
        now = secure_filename(now[0] + "-" + now[1])
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], now))
        img = cv2.imread("static/" + now)
        # img = cv2.resize(img, (224, 224))
        picture = detectface(img)
        if picture is False:
            img = text_alignment("noface", img)
            cv2.imwrite("static/results/" + now, img)
        else:
            img = cv2.resize(img, (224, 224))
            picture = cv2.resize(picture, (224, 224))
            path = "models/memegen1.tflite"
            results = layer(path, labels, [picture])
            output = sorted(results, key=results.get, reverse=True)
            print(output[0])
            img = text_alignment(output[0], img)
            cv2.imwrite("static/results/" + now, img)
            print("Finish!")
        Image1 = Image.open("static/results/" + now)
        Image1copy = Image1.copy()
        Image2 = Image.open("static/dontdelete/logo.jpeg")
        Image2copy = Image2.copy()
        Image2copy.putalpha(128)
        Image2copy = Image2copy.resize((60, 30), Image.ANTIALIAS)
        Image1copy.paste(Image2copy, (235, 265))
        Image1copy.save("static/results/" + now)
        result_dic = {
            "im": "results/" + now,
        }
        return render_template("memslide.html", image=result_dic)
    else:
        result_dic = {
            "im": "dontdelete/file.jpg",
        }
        return render_template("memslide.html", image=result_dic)


app.run(host="0.0.0.0", debug=True)
