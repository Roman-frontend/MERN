const Link = require("../models/Link.js");
const RedirectService = require("../Service/RedirectService.js");

class RedirectController {
  async get(req, res) {
    try {
      const result = await RedirectService.get(req.params);

      if (result.status === 400) {
        return res.status(400).json(result.data);
      }

      return res.redirect(result.data);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
}

module.exports = new RedirectController();
