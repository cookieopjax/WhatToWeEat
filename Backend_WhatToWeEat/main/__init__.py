from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

import datetime

jwt = JWTManager()

# create the extension
db = SQLAlchemy()

# create the app
app = Flask(__name__)

CORS(app)

app.debug = True 

# 設定 JWT 密鑰
app.config['JWT_SECRET_KEY'] = 'wte-temp-secret-key'
jwt.init_app(app)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=30)

# initialize the app with the extension
db.init_app(app)


from main import model
from main import route