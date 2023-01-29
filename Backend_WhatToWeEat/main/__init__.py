from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

import datetime

jwt = JWTManager()

# create the app
app = Flask(__name__)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

# 設定 JWT 密鑰
app.config['JWT_SECRET_KEY'] = 'wte-temp-secret-key'

# create the extension
db = SQLAlchemy(app)

CORS(app)

app.debug = True 

jwt.init_app(app)

JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=30)

# # initialize the app with the extension
# db.init_app(app)

from main import model
from main import route