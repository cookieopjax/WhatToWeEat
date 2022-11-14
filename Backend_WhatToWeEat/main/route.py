from main import app, db
import os

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


# 寫完資料Model後，進入這個route，更新.db檔案 (僅為初期開發方便使用)
@app.route("/update_db")
def updateDB():
    # 刪除原本的.db檔案
    if os.path.isfile("instance/project.db"):
      os.remove("instance/project.db")

    #新增新的.db檔案
    db.create_all()
    return "update database success"