# 今天吃什麼 後端

## Pre-install
```
Node.js v18.13.0
```

## Run this project

```
npm install
npm run dev
```

## Environment Variable
有一些機密的變數，不方面在加到git上，部屬時才會加上正式的.env檔案。

在開發時，則是預設調用.env.development檔案，它裡面的value是空的，因此某些需要用到該變數的功能可能無法運作，如果有需要開發到相關的功能，請寄信到[這裡](vigor01695@gmail.com)詢問這些變數的值。

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
|-- app.jss
```
app.js會去引入database和route

database.js去連結資料庫，呼叫model建立table

route包含路由，觸發到某一路由時，呼叫controller的function，在該controller裡send data

model內有function存取資料庫資料，並給controller用 