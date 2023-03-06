const jwt = require("jsonwebtoken");
const { User } = require("../models");

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
    const token = jwt.sign({ username }, "test_token_should_replace_by_env");
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.createUser = async (req, res) => {
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
  }
};
