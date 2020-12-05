from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from sklearn.cluster import KMeans
import numpy as np
import cv2
from collections import Counter
import base64
import re

app = Flask(__name__)
CORS(app)

def RGB2HEX(color):
    return "#{:02x}{:02x}{:02x}".format(int(color[0]), int(color[1]), int(color[2]))

def readb64(uri):
   uri = re.split('data:image/(jpeg|png);base64(.*)', uri)[2]
   nparr = np.fromstring(base64.b64decode(uri), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
   img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
   return img

def get_image_from_file(file):
  uploaded_file = file.read()
  np_image = np.fromstring(uploaded_file, np.uint8)
  return cv2.imdecode(np_image, cv2.IMREAD_COLOR)

def get_image_from_data(file):
   nparr = np.frombuffer(base64.b64decode(file), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
   img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
   return img

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

@app.route('/', methods=['GET'])
def index():
    return 'INDEX'

@app.route('/get-color', methods=['POST'])
def upload_file():
    if request.files:
        image = get_image_from_file(request.files['file'])
    else:
        image = get_image_from_data(request.data)
    result = get_colors(image, 8)
    return jsonify(colors=result)
    # return json.dumps({'data': request.data})


if __name__ == "__main__":
    # Used when running locally only. When deploying to Cloud Run,
    # a webserver process such as Gunicorn will serve the app.
    app.run(host="localhost", port=8080, debug=True)