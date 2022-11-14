from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# create the extension
db = SQLAlchemy()
# create the app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(app)

# 定義資料庫表
class User(db.Model):
    username = db.Column(db.String, unique=True,
                         nullable=False, primary_key=True)
    password = db.Column(db.String, unique=True, nullable=False)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


# 寫完資料Model後，進入這個route，更新.db檔案
@app.route("/update_db")
def updateDB():
    os.remove("instance/project.db")
    db.create_all()
    return "update database success"
