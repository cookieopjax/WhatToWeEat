from main import db

# 定義資料庫表
class User(db.Model):
    username = db.Column(db.String, unique=True,
                         nullable=False, primary_key=True)
    restaurants = db.relationship("Restaurant", backref="user")
    password = db.Column(db.String, unique=True, nullable=False)


    def __init__(self, username, password):
        self.username = username
        self.password = password

class Restaurant(db.Model):
    username = db.Column(db.String, db.ForeignKey("user.username"))
    id = db.Column(db.Integer, unique=True,
                         nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)