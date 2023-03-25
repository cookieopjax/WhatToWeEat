const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express"); // 產生swagger ui介面
const dotenv = require("./utils/envSetup");
const { errorHandler } = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes"); // 引入userRoutes.js路由文件
const restaurantRoutes = require("./routes/restaurantRoutes"); // 引入userRoutes.js路由文件
const { swaggerSpec } = require("./utils/database");

const app = express();

// 暫時開發用，允許全部
app.use(cors());

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
