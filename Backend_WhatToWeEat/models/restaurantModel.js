const { sequelize } = require("../utils/database");
const { Model, DataTypes } = require("sequelize");

const Restaurant = sequelize.define("Restaurant", {
  username: DataTypes.STRING,
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  image: DataTypes.STRING,
});

// 取得該使用者下的所有餐廳
Restaurant.getUserRestaurants = async (username) => {
  return await Restaurant.findAll({
    where: {
      username: username,
    },
  });
};

Restaurant.createRestaurant = async (restaurant) => {
  return await Restaurant.create(restaurant);
};

Restaurant.getRestaurant = async (id) => {
  return await Restaurant.findOne({ where: { id: id } });
};

// 更新指定id的餐廳資訊
Restaurant.updateRestaurant = async (restaurant) => {
  await Restaurant.update(restaurant, {
    where: {
      id: restaurant.id,
    },
  });
  return;
};

// 刪除指定id的餐廳資訊
Restaurant.deleteRestaurant = async (id) => {
  await Restaurant.destroy({
    where: {
      id: id,
    },
  });
  return;
};

module.exports = { Restaurant };
