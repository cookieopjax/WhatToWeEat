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
  await Restaurant.findAll({
    where: {
      username,
    },
  });
};

Restaurant.createRestaurant = async (restaurant) => {
  await Restaurant.create(restaurant);
};

Restaurant.getRestaurant = async (id) => {
  await Restaurant.findOne({ where: { id } });
};

// 更新指定id的餐廳資訊
Restaurant.updateRestaurant = async (restaurant) => {
  await Restaurant.update(restaurant, {
    where: {
      id: restaurant.id,
    },
  });
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
