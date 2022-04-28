const Link = require("../models/Link.js");

class RedirectService {
  async get({ code }) {
    if (!code) {
      return { status: 400, data: { message: "code не вказано" } };
    }

    const link = await Link.findOne({ code });

    if (link) {
      link.clicks++;
      await link.save();
      return { status: 200, data: link.from };
    }

    return { status: 400, data: { message: "Ссылка не найдена" } };
  }
}

module.exports = new RedirectService();
