
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

module.exports.decodedToken = function (req, res) {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    res.json({ decodedToken });
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
