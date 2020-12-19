from flask import Flask, request, jsonify, Response
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

@app.route('/brands/update', methods=['POST'])
def update_brand():
    db_requests.update_brand(request.json)
    return Response(status=200)

@app.route('/brands/add', methods=['POST'])
def add_brand():
    db_requests.add_brand(request.json)
    return Response(status=200)

@app.route('/brands/delete', methods=['POST'])
def delete_brand():
    db_requests.delete_brand(int(request.args.get('id')))
    return Response(status=200)

@app.route('/products', methods=['GET'])
def get_products():
    brand_id = request.args.get('brandId')
    user_id = request.args.get('userId')
    target_product_id = request.args.get('compareToProduct')
    target_color = request.args.get('compareToColor')
    if (brand_id != None):
        return jsonify(db_requests.get_products_by_brand_id(brand_id, user_id))
    elif (target_color != None):
        return(jsonify(color_compare.find_closest_color(target_color, user_id)))
    else:
        return jsonify(db_requests.get_products(user_id))

@app.route('/products/favorite', methods=['GET'])
def get_favorite_products():
    user_id = request.args.get('userId')
    return jsonify(db_requests.get_user_favorite_products(user_id))

@app.route('/products/set-favorite', methods=['POST'])
def set_favorite_product():
    user_id = request.args.get('userId')
    product_id = request.args.get('productId')
    return jsonify(db_requests.set_user_favorite_product(user_id, product_id))

@app.route('/products/remove-favorite', methods=['POST'])
def remove_favorite_product():
    user_id = request.args.get('userId')
    product_id = request.args.get('productId')
    return jsonify(db_requests.remove_user_favorite_product(user_id, product_id))

@app.route('/products/add', methods=['POST'])
def add_product():
    db_requests.add_product(request.json)
    return Response(status=200)

@app.route('/users/add', methods=['POST'])
def add_user():
    db_requests.add_user(request.json)
    return Response(status=200)

@app.route('/user/get', methods=['GET'])
def get_user():
    return jsonify(db_requests.get_user_by_email(request.args.get('email')))

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
