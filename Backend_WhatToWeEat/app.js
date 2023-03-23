const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express"); // 產生swagger ui介面
const { errorHandler } = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes"); // 引入userRoutes.js路由文件
const restaurantRoutes = require("./routes/restaurantRoutes"); // 引入userRoutes.js路由文件
const { sequelize, swaggerSpec } = require("./utils/database");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env" });
} else {
  dotenv.config({ path: ".env.development" });
}

const app = express();

// 暫時開發用，允許全部
app.use(cors());

// 進行資料庫更新
// sequelize.sync();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "server is running" });
});

// 把Express掛載路由進來
app.use("/api", userRoutes);
app.use("/api", restaurantRoutes);
app.use(errorHandler);

// 將Swagger UI加到Express中
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;

// 啟動Express
// app.listen(4234, () => {
//   console.log(`-> Express server listening on port http://localhost:4234
// -> You can see the api docs on http://localhost:4234/api-docs`);
// });
