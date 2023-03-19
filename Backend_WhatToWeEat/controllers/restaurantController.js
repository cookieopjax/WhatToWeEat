const { Restaurant } = require("../models/");
const { getUsername } = require("../utils/jwt");
const { ImgurClient } = require("imgur");
const { response } = require("express");

// 取得該使用者的所有餐廳
exports.getAllRestaurant = async (req, res) => {
  try {
    let username = await getUsername(req, res);

    const restaurantList = await Restaurant.getUserRestaurants(username);

    res.send(restaurantList);
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};

// 取得當日推薦餐廳
exports.getRecommendRestaurant = async (req, res) => {
  try {
    let username = await getUsername(req, res);

    const restaurantList = await Restaurant.getUserRestaurants(username);

    recommendRestaurant =
      restaurantList[Math.floor(Math.random() * restaurantList.length)];

    res.send(recommendRestaurant);
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};

// 新增一筆新餐廳
exports.addRestaurant = async (req, res) => {
  try {
    let username = await getUsername(req, res);
    const restaurant = req.body;
    restaurant.username = username;
    const user = await Restaurant.createRestaurant(restaurant);
    res.send(user);
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};

// 查詢指定id的餐廳
exports.getRestaurant = async (req, res) => {
  try {
    let username = await getUsername(req, res);
    const { id } = req.params;
    const selectedRestaurant = await Restaurant.getRestaurant(id);

    if (!selectedRestaurant) {
      res.status(404).send("Restaurant not found");
      return;
    }

    if (selectedRestaurant.username != username) {
      res.status(403).send("Forbidden");
      return;
    }

    res.send(selectedRestaurant);
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};

// 更新指定id餐廳資訊
exports.updateRestaurant = async (req, res) => {
  try {
    let newRestaurant = req.body;
    let username = await getUsername(req, res);
    const { id } = req.params;
    let selectedRestaurant = await Restaurant.getRestaurant(id);

    if (!selectedRestaurant) {
      res.status(404).send("Restaurant not found");
      return;
    }

    if (selectedRestaurant.username != username) {
      res.status(403).send("Forbidden");
      return;
    }

    newRestaurant.id = id;
    newRestaurant.username = username;
    await Restaurant.updateRestaurant(newRestaurant);
    res.send(newRestaurant);
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};

// 刪除指定id餐廳資訊
exports.deleteRestaurant = async (req, res) => {
  try {
    let username = await getUsername(req, res);
    const { id } = req.params;
    let selectedRestaurant = await Restaurant.getRestaurant(id);

    if (!selectedRestaurant) {
      res.status(404).send("Restaurant not found");
      return;
    }

    if (selectedRestaurant.username != username) {
      res.status(403).send("Forbidden");
      return;
    }

    await Restaurant.deleteRestaurant(id);
    res.send(id + " restaurant is deleted");
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};

// 上傳圖片
exports.postRestaurantImage = async (req, res) => {
  try {
    let username = await getUsername(req, res);
    const { id } = req.params;
    const selectedRestaurant = await Restaurant.getRestaurant(id);

    if (!selectedRestaurant) {
      res.status(404).send("Restaurant not found");
      return;
    }

    if (selectedRestaurant.username != username) {
      res.status(403).send("Forbidden");
      return;
    }

    const file = req.file;

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
        Please refer to the Environment Variables section of the backend_whatToweEat readme.
        `
      );
    }

    let newRest = {
      id: selectedRestaurant.id,
      name: selectedRestaurant.name,
      address: selectedRestaurant.address,
      image: response.data.link,
      phone: selectedRestaurant.phone,
    };

    await Restaurant.updateRestaurant(newRest);
    response.data.link;

    res.send({ url: response.data.link });
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};
