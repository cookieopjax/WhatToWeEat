const { Sequelize } = require("sequelize");
const swaggerJSDoc = require("swagger-jsdoc"); // 產生swagger api檔案

// Swagger文檔配置
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "What To We Eat API",
      version: "1.0.0",
      description: "The API docs for What to we eat",
    },
  },
  // API文件的路徑
  apis: ["routes/*.js"],
};

// 初始化Swagger JSDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);
exports.swaggerSpec = swaggerSpec;

// 建立資料庫
const sequelize = new Sequelize("sqlite:project.db"); // 會以app.js為起點解析目錄
exports.sequelize = sequelize;
