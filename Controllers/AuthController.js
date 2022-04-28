const AuthService = require("../Service/AuthService.js");

class AuthController {
  async register(req, res) {
    try {
      const result = AuthService.register(req);
      return res.status(201).json(result);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async login(req, res) {
    try {
      const user = await AuthService.login(req);
      if (user.status == 400) {
        return res.status(400).json(user.data);
      }

      return res.status(201).json(user.data);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new AuthController();
