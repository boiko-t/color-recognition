from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
from sqlite3 import Error
from init import init_database

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST', 'GET'])
def index():
    result = {'colors': ['#72c0dd', '#d1e5f3', '#3d8fb2', '#c4deee']}
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
    # init_database(r"D:\html\color-recognition-app\server-app\src\db\database.db")