from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.cluster import KMeans
import numpy as np
import cv2
from collections import Counter
import base64
from utils import file_read
from cv import color_recognition
from db.init import init_database

app = Flask(__name__)
CORS(app)

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


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
    # init_database(r"/usr/src/app/db/database.db")