const { sequelize } = require("../utils/database");
const { Model, DataTypes } = require("sequelize");

const Restaurant = sequelize.define("Restaurant", {
  username: DataTypes.STRING,
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  image: DataTypes.STRING,
});

module.exports = { Restaurant };
