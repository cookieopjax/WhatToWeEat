from main import app, db
from main.model import User
import os
from flask import request, jsonify 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

@app.route("/")
def server_status_check():
    return jsonify(msg = "server is running !"), 200


@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")

    # 帳密是否存在
    isRepeatUsername = User.query.filter_by(username = username).first()

    # 重複的用戶名稱
    if isRepeatUsername :
        return jsonify(msg = "This username is already registered"), 409

    user = User(username, password)
    db.session.add(user)
    db.session.commit()
    return jsonify(msg = "register success"), 200


@app.route("/authentication", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(username=current_user), 200


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password =  request.json.get("password")
    isRepeatUsername = User.query.filter_by(username = username).first()
    isRepeatPassword = User.query.filter_by(password = password).first()

    if not (isRepeatUsername and isRepeatPassword):
        return jsonify(msg = "login failed"), 401

    # 製作jwt token，以username作為辨識
    access_token = create_access_token(username)
    return jsonify(access_token=access_token)


# 寫完資料Model後，進入這個route，更新.db檔案 (僅為初期開發方便使用)
@app.route("/update_db")
def updateDB():
    # 刪除原本的.db檔案
    if os.path.isfile("instance/project.db"):
        os.remove("instance/project.db")

    #新增新的.db檔案
    db.create_all()
    return "update database success"

