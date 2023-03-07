const jwt = require("jsonwebtoken");

exports.generateJwt = (identity) => jwt.sign(identity, process.env.JWT_SECRET);

exports.authentication = (req, res, next) => {
  let token = "";
  try {
    token = req.headers["authorization"].split(" ")[1];
  } catch (e) {
    token = "";
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    } else {
      next();
    }
  });
};

exports.getUsername = async (req, res) => {
  let token = "";
  try {
    token = req.headers["authorization"].split(" ")[1];
  } catch (e) {
    token = "";
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded.username;
  } catch (err) {
    console.error("JWT 驗證失敗 ", err);
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
