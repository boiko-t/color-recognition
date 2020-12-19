from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return 'INDEX'

@app.route('/brands/update', methods=['POST'])
def update_brand():
    data = request.json
    # return jsonify(db_requests.get_brands())
    return data['name']

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)