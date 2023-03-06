const express = require("express");
const swaggerUi = require("swagger-ui-express"); //產生swagger ui介面
const userRoutes = require("./routes/userRoutes"); // 引入userRoutes.js路由文件
const { sequelize, swaggerSpec } = require("./utils/database");
const { User, Restaurant } = require("./models"); //建立表

const app = express();

//進行資料庫更新
sequelize.sync();

app.use(express.json());

//把Express掛載路由進來
app.use("/api", userRoutes);

// 將Swagger UI加到Express中
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 啟動Express
app.listen(4234, () => {
  console.log(`Express server listening on port http://localhost:4234
You can see the api docs on http://localhost:4234/api-docs`);
});
