# 今天吃什麼 後端

## Pre-install
- Poetry
    - poetry config virtualenvs.in-project true

## Project Setup
```
poetry install
```

## Project Run
```
poetry run flask run
```

## Database
- SQLite 
- flask_sqlalchemy


## 專案架構
目前的專案架構可能不是最好的，歡迎更動
```
instance/
    project.db # 資料庫
main/
    __init__.py # 初始化
    model.py # 資料庫Model
    route.py # 路由設置
app.py   #Flask進入點
```

### 更動資料庫
1. 改model.py檔案內容
2. 重啟flask服務
3. 進入/update_db路由 