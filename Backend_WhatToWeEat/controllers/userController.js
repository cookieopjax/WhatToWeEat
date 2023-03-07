const { User } = require("../models");
const { generateJwt } = require("../utils/jwt");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const selectedUser = await User.findOne({ where: { username: username } });
    //找不到帳號
    if (!selectedUser) {
      res.status(404).json({ msg: "User not found." });
      return;
    }

    //密碼錯誤
    if (selectedUser.dataValues.password !== password) {
      res.status(401).json({ msg: "Incorrect password." });
      return;
    }

    //正確，發出token
    const token = generateJwt({ username });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Server error");
    console.error(error);
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send(user);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(409)
        .send("The username is already taken. Please choose another one.");
      return;
    }
    res.status(500).send("Server error");
    console.error(error);
  }
};
