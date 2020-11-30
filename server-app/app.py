from flask import Flask, request, render_template, redirect, url_for
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import numpy as np
import cv2
from collections import Counter
from skimage.color import rgb2lab, deltaE_cie76
import os

app = Flask(__name__)

def RGB2HEX(color):
    return "#{:02x}{:02x}{:02x}".format(int(color[0]), int(color[1]), int(color[2]))


def get_image_from_request(file):
    uploaded_file = file.read()
    np_image = np.fromstring(uploaded_file, np.uint8)
    return cv2.imdecode(np_image, cv2.IMREAD_COLOR)

def get_colors(image, number_of_colors):
  modified_image = cv2.resize(image, (600, 400), interpolation = cv2.INTER_AREA)
  modified_image = modified_image.reshape(modified_image.shape[0]*modified_image.shape[1], 3)

  clf = KMeans(n_clusters = 4)
  labels = clf.fit_predict(modified_image)
  counts = Counter(labels)

  center_colors = clf.cluster_centers_
  ordered_colors = [center_colors[i] for i in counts.keys()]
  hex_colors = [RGB2HEX(ordered_colors[i]) for i in counts.keys()]

  return hex_colors

@app.route('/')
def index():
    return '<form method="POST" action="" enctype="multipart/form-data"><p><input type="file" name="file"></p><p><input type="submit" value="Submit"></p></form>'

@app.route("/get-color", methods=["GET"])
def get_color():
    """ Return a friendly HTTP greeting. """
    who = request.args.get("who", "World")
    return "Hello " +  who

@app.route('/', methods=['POST'])
def upload_file():
    image = get_image_from_request(request.files['file'])
    return ', '.join(get_colors(image, 8))


if __name__ == "__main__":
    # Used when running locally only. When deploying to Cloud Run,
    # a webserver process such as Gunicorn will serve the app.
    app.run(host="localhost", port=8080, debug=True)