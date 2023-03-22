const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: DataTypes.STRING,
});

module.exports = { User };
