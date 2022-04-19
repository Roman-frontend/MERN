const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    console.log("token... ", token, config.get("jwtAccessSecret"));

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }

    const decoded = jwt.verify(
      token,
      config.get("jwtAccessSecret"),
      (err, decoded) => {
        if (err) {
          console.log("err after jwt.verify... ", err);
        } else {
          console.log("decoded after jwt.verify... ", decoded);
          return decoded;
        }
      }
    );

    console.log("decoded... ", decoded);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};
