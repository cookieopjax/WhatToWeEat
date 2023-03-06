# 今天吃什麼 後端

## Run this project

```
npm install
npm run backend
```

## Database
- SQLite 
- Sequelize

## 專案架構
專案架構皆為手動配置，有更好優化的可以提出
```
app/
|-- controllers/
|   |-- userController.js
|-- models/
|   |-- user.js
|-- routes/
|   |-- userRoutes.js
|-- utils/
|   |-- database.js
|-- app.js
```
app.js會去引入database和route
database.js去連結資料庫，呼叫model建立table
route包含路由，觸發到某一路由時，呼叫controller的function，在該controller裡send data
model內有function存取資料庫資料，並給controller用 