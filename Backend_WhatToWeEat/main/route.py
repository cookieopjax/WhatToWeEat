from main import app, db
from main.model import User
from main.model import Restaurant
import os
from flask import request, jsonify 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import random

@app.route("/")
def server_status_check():
    return jsonify(msg = "server is running !"), 200

# 新增一筆餐廳
@app.route("/restaurant", methods=["POST"])
@jwt_required()
def postRestaurant():
    current_user = get_jwt_identity()
    restaurantName = request.json.get("name")
    restaurantPhone = request.json.get("phone")
    restaurantAddress = request.json.get("address");
    restaurantImage = request.json.get("image");
    
    restaurantData = Restaurant(current_user, restaurantName, restaurantPhone, restaurantAddress, restaurantImage);
    db.session.add(restaurantData)
    db.session.commit()
    return jsonify(msg = "restaurant add success"), 200

# 取得使用者的所有餐廳
@app.route("/restaurant", methods=["GET"])
@jwt_required()
def getRestaurant():
    current_user = get_jwt_identity()
    
    rawRestaurant = Restaurant.query.filter_by(username=current_user).all()
    restaurantList = []
    for item in rawRestaurant:
        tempRestaurant = {
            'id' : item.id,
            'name' : item.name,
            'phone': item.phone,
            'address': item.address,
            'image' : item.image
        }
        restaurantList.append(tempRestaurant)

    return jsonify(restaurantList), 200

# 更新使用者餐廳
@app.route("/restaurant", methods=["PUT"])
@jwt_required()
def updateRestaurant():
    current_user = get_jwt_identity()
    restaurantId = request.json.get("id")
    thisRestaurant = Restaurant.query.filter_by(id=restaurantId).first()
    if thisRestaurant.username != current_user:
        return jsonify(msg = "unauthorized data access"), 403

    thisRestaurant.name = request.json.get("name")
    thisRestaurant.address = request.json.get("address")
    thisRestaurant.phone = request.json.get("phone")

    db.session.commit()
    return jsonify(msg = "data is update successfully"), 200
    
# 取得使用者當日餐廳
@app.route("/pick_restaurant", methods=["GET"])
@jwt_required()
def pickRestaurant():
    current_user = get_jwt_identity()
    
    rawRestaurant = Restaurant.query.filter_by(username=current_user).all()
    restaurantList = []
    for item in rawRestaurant:
        tempRestaurant = {
            'id' : item.id,
            'name' : item.name,
            'phone': item.phone,
            'address': item.address,
            'image' : item.image
        }
        restaurantList.append(tempRestaurant)
    index = random.randint(0, len(restaurantList) - 1)
    return jsonify(restaurantList[index]), 200

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

