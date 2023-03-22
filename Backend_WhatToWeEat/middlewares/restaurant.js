const { Restaurant } = require("../models");
const { getUsername } = require("../utils/jwt");

exports.getRestById = async (req, res, next) => {
  const username = await getUsername(req, res);
  const { id } = req.params;
  const selectedRestaurant = await Restaurant.getRestaurant(id);

  if (!selectedRestaurant) {
    res.status(404).send("Restaurant not found");
    return;
  }

  if (selectedRestaurant.username !== username) {
    res.status(403).send("Forbidden");
    return;
  }

  res.selectedRest = selectedRestaurant;
  next();
};
