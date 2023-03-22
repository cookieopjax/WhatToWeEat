const { ImgurClient } = require("imgur");
const { Restaurant } = require("../models");
const { getUsername } = require("../utils/jwt");

// 取得該使用者的所有餐廳
exports.getAllRestaurant = async (req, res) => {
  const username = await getUsername(req, res);

  const restaurantList = await Restaurant.getUserRestaurants(username);

  res.send(restaurantList);
};

// 取得當日推薦餐廳
exports.getRecommendRestaurant = async (req, res) => {
  const username = await getUsername(req, res);

  const restaurantList = await Restaurant.getUserRestaurants(username);

  const recommendRestaurant = restaurantList[Math.floor(Math.random() * restaurantList.length)];

  res.send(recommendRestaurant);
};

// 新增一筆新餐廳
exports.addRestaurant = async (req, res) => {
  const username = await getUsername(req, res);
  const restaurant = req.body;
  restaurant.username = username;
  const user = await Restaurant.createRestaurant(restaurant);
  res.send(user);
};

// 查詢指定id的餐廳
exports.getRestaurant = async (req, res) => {
  res.send(res.selectedRest);
};

// 更新指定id餐廳資訊
exports.updateRestaurant = async (req, res) => {
  const newRestaurant = req.body;

  newRestaurant.id = res.selectedRest.id;

  await Restaurant.updateRestaurant(newRestaurant);
  res.send(newRestaurant);
};

// 刪除指定id餐廳資訊
exports.deleteRestaurant = async (req, res) => {
  await Restaurant.deleteRestaurant(res.selectedRest.id);
  res.send(`${res.selectedRest.id} restaurant is deleted`);
};

// 上傳圖片
exports.postRestaurantImage = async (req, res) => {
  const selectedRestaurant = res.selectedRest;

  const { file } = req;

  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENTID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN,
  });

  const response = await client.upload({
    image: file.buffer.toString("base64"),
    type: "base64",
    album: process.env.IMGUR_ALBUM_ID,
  });

  if (!response.success) {
    throw new Error(
      `The response from imgur is undefined.
        This may be due to the environment variables related to the imgur API not being set up properly.
        Please refer to the Environment Variables section of the backend_whatToWeEat readme.
        `,
    );
  }

  const newRest = {
    id: selectedRestaurant.id,
    name: selectedRestaurant.name,
    address: selectedRestaurant.address,
    image: response.data.link,
    phone: selectedRestaurant.phone,
  };

  await Restaurant.updateRestaurant(newRest);
  res.send({ url: response.data.link });
};
