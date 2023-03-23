const app = require("./app");
const { sequelize } = require("./utils/database");

// 進行資料庫更新
sequelize.sync();

// 啟動Express
app.listen(4234, () => {
  console.log(`-> Express server listening on port http://localhost:4234
-> You can see the api docs on http://localhost:4234/api-docs`);
});
