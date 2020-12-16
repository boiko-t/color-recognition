from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import file_read
from cv import color_recognition, color_compare
from db import db_requests

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return 'INDEX'

@app.route('/brands', methods=['GET'])
def get_brands():
    return jsonify(db_requests.get_brands())

@app.route('/products', methods=['GET'])
def get_products():
    brand_id = request.args.get('brandId')
    target_product_id = request.args.get('compareToProduct')
    target_color = request.args.get('compareToColor')
    if (brand_id != None):
        return jsonify(db_requests.get_products_by_brand_id(brand_id))
    elif (target_color != None):
        return(jsonify(color_compare.find_closest_color(target_color)))
    else:
        return jsonify(db_requests.get_products())

@app.route('/get-color', methods=['POST'])
def get_colors():
    if request.files:
        image = file_read.get_image_from_file(request.files['file'])
    else:
        image = file_read.get_image_from_data(request.data)
    result = color_recognition.get_colors(image, 8)
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
