from main import db

# 定義資料庫表
class User(db.Model):
    username = db.Column(db.String, unique=True,
                         nullable=False, primary_key=True)
    password = db.Column(db.String, unique=True, nullable=False)
