from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.cluster import KMeans
import numpy as np
import cv2
from collections import Counter
import base64
from utils import file_read
from cv import color_recognition
from db import db_requests

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return 'INDEX'

@app.route('/brands', methods=['GET'])
def get_brands():
    return jsonify(brands=db_requests.get_brands())

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products=db_requests.get_products())

@app.route('/get-color', methods=['POST'])
def get_colors():
    if request.files:
        image = file_read.get_image_from_file(request.files['file'])
    else:
        image = file_read.get_image_from_data(request.data)
    result = color_recognition.get_colors(image, 8)
    return jsonify(colors=result)


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
