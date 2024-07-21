import os
import random
import shutil
from datetime import datetime

import numpy as np
import cv2
from PIL import ImageFont, ImageDraw, Image
from flask import Flask, request, render_template, jsonify, send_file
from werkzeug.utils import secure_filename
import tensorflow as tf

app = Flask(__name__)

# Configuration
STATIC = os.getenv("UPLOAD_FOLDER", "./static")
app.config["UPLOAD_FOLDER"] = os.path.join(STATIC, "inputs")
app.config["RESULTS_FOLDER"] = os.path.join(STATIC, "results")
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
LABELS = ["happy", "disgust", "neutral", "sad", "fear", "anger", "surprise"]


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_interpreter(model_path):
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter


def predict_emotion(interpreter, labels, frame):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    interpreter.set_tensor(input_details[0]["index"], frame)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]["index"])
    return {labels[i]: output_data[0][i] for i in range(len(labels))}


def detect_face(img):
    face_cascade = cv2.CascadeClassifier(
        "facedetection/haarcascade_frontalface_default.xml"
    )
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    if len(faces) == 0:
        return False
    for x, y, w, h in faces:
        roi_gray = img[y : y + h, x : x + w]
        cropped_img = np.expand_dims(
            np.expand_dims(cv2.resize(roi_gray, (224, 224)), -1), 0
        )
        return roi_gray


def get_font_size(text):
    length = len(text)
    if length < 12:
        return 36
    elif length < 20:
        return 26
    else:
        return 48 - length


def add_text_to_image(label, img):
    label_file = f"memes/{label}.txt"
    with open(label_file, "r") as f:
        texts = [x.strip() for x in f]

    chosen_text = random.choice(texts)
    lines = chosen_text.split("|")
    color = (255, 255, 255)
    shadowcolor = (0, 0, 0)

    img = cv2.resize(img, (300, 300))
    cv2_im_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    pil_im = Image.fromarray(cv2_im_rgb)
    draw = ImageDraw.Draw(pil_im)

    for i, line in enumerate(lines):
        font_size = get_font_size(line)
        font = ImageFont.truetype("1.ttf", font_size)
        x, y = 29 - len(line) + 2, 230 - 30 * (len(lines) - 1) + 30 * i
        draw_text_with_border(draw, (x, y), line, font, color, shadowcolor)

    return cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)


def draw_text_with_border(draw, position, text, font, color, shadowcolor):
    x, y = position
    # thin border
    draw.text((x - 1, y), text, font=font, fill=shadowcolor)
    draw.text((x + 1, y), text, font=font, fill=shadowcolor)
    draw.text((x, y - 1), text, font=font, fill=shadowcolor)
    draw.text((x, y + 1), text, font=font, fill=shadowcolor)
    # thicker border
    draw.text((x - 1, y - 1), text, font=font, fill=shadowcolor)
    draw.text((x + 1, y - 1), text, font=font, fill=shadowcolor)
    draw.text((x - 1, y + 1), text, font=font, fill=shadowcolor)
    draw.text((x + 1, y + 1), text, font=font, fill=shadowcolor)
    # main text
    draw.text((x, y), text, font=font, fill=color)


def save_image_with_logo(image_path, result_path):
    Image1 = Image.open(image_path)
    Image1copy = Image1.copy()
    Image2 = Image.open("static/dontdelete/logo.jpeg")
    Image2copy = Image2.copy()
    Image2copy.putalpha(128)
    Image2copy = Image2copy.resize((60, 30), Image.LANCZOS)
    Image1copy.paste(Image2copy, (235, 265), Image2copy)
    Image1copy.save(result_path)


def cleanup_folder(folder):
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        if os.path.isfile(file_path) and file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            os.unlink(file_path)


@app.route("/")
def index():
    return render_template("memslide.html")


@app.route("/", methods=["POST"])
def upload_file():
    # Clean up previous files
    cleanup_folder(app.config["UPLOAD_FOLDER"])
    cleanup_folder(app.config["RESULTS_FOLDER"])

    file = request.files.get("photo")
    if file and allowed_file(file.filename):
        now = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        filename = secure_filename(file.filename)
        file_extension = filename.split(".")[-1]
        saved_filename = f"{now}.{file_extension}"
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], saved_filename)
        file.save(file_path)

        img = cv2.imread(file_path)
        face_img = detect_face(img)

        if face_img is False:
            img = add_text_to_image("noface", img)
        else:
            img = cv2.resize(img, (224, 224))
            face_img = cv2.resize(face_img, (224, 224))
            interpreter = get_interpreter("models/memegen1.tflite")
            results = predict_emotion(interpreter, LABELS, [face_img])
            dominant_emotion = max(results, key=results.get)
            img = add_text_to_image(dominant_emotion, img)

        result_path = os.path.join(app.config["RESULTS_FOLDER"], saved_filename)
        cv2.imwrite(result_path, img)
        save_image_with_logo(result_path, result_path)

        result_dic = {"im": f"results/{saved_filename}"}
        return render_template("memslide.html", image=result_dic)
    else:
        result_dic = {"im": "dontdelete/file.jpg"}
        return render_template("memslide.html", image=result_dic)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1234)
