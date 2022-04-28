const shortid = require("shortid");
const Link = require("../models/Link.js");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User.js");

class AuthService {
  async register(req) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error("Некорректный данные при регистрации");
    }

    const { email, password } = req.body;

    console.log("email, password => ", email, password);

    const candidate = await User.findOne({ email });

    console.log("candidate => ", candidate);

    if (candidate) {
      throw new Error("Такой пользователь уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    return { message: "Пользователь создан" };
  }

  async login(req) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return {
        status: 400,
        data: {
          errors: errors.array(),
          message: "Некорректный данные при входе в систему",
        },
      };
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Неверный пароль, попробуйте снова");
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get("jwtAccessSecret")
      // {
      //   expiresIn: "1h",
      // }
    );

    return {
      data: {
        token,
        userId: user.id,
      },
    };
  }
}

module.exports = new AuthService();
