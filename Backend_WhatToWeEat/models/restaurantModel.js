const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Restaurant = sequelize.define("Restaurant", {
  username: DataTypes.STRING,
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  image: DataTypes.STRING,
});

// 取得該使用者下的所有餐廳
Restaurant.getUserRestaurants = async (username) => {
  const allRest = await Restaurant.findAll({
    where: {
      username,
    },
  });
  return allRest;
};

Restaurant.createRestaurant = async (restaurant) => {
  const newRest = await Restaurant.create(restaurant);
  console.log(newRest);
};

Restaurant.getRestaurant = async (id) => {
  const rest = await Restaurant.findOne({ where: { id } });
  return rest;
};

// 更新指定id的餐廳資訊
Restaurant.updateRestaurant = async (restaurant) => {
  const updatedRest = await Restaurant.update(restaurant, {
    where: {
      id: restaurant.id,
    },
  });
  return updatedRest;
};

// 刪除指定id的餐廳資訊
Restaurant.deleteRestaurant = async (id) => {
  await Restaurant.destroy({
    where: {
      id,
    },
  });
};

module.exports = { Restaurant };
