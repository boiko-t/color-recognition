from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST', 'GET'])
def index():
    result = {'colors': ['#72c0dd', '#d1e5f3', '#3d8fb2', '#c4deee']}
    return jsonify(result)

if __name__ == "__main__":
    # Used when running locally only. When deploying to Cloud Run,
    # a webserver process such as Gunicorn will serve the app.
    app.run(host="localhost", port=8080, debug=True)