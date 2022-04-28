const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link.js");

class LinkService {
  async getAll({ limit }) {
    const links = await Link.find();

    if (!!limit) {
      const parsedLimit = parseInt(limit);
      const limitedLinks = [];

      for (let i = 0; i < parsedLimit; i++) {
        if (links[i]) limitedLinks.push(links[i]);
      }

      return limitedLinks;
    }

    return links;
  }

  async getOne({ id }) {
    if (!id) {
      throw new Error("id не вказано");
    }

    const link = await Link.findById(id);
    return link;
  }

  async create({ from }, { userId }) {
    const baseUrl = config.get("baseUrl");
    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return { link: existing };
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: userId,
    });

    await link.save();

    return { link };
  }

  async update({ id }, body) {
    if (!id) {
      throw new Error("id не вказано");
    }

    Link.findOneAndUpdate(
      { _id: id },
      { from: body.from },
      // upsert: true - якщо документу не знайдено то створить новий, а якщо знайдено то обновить знайдений
      { useFindAndModify: false, upsert: true, timestamps: true, new: true },
      (err) => {
        if (err) {
          throw new Error("Повідомлення не змінене");
        }
      }
    );

    const link = await Link.findById(id);

    return link;
  }

  async delete({ id }) {
    if (!id) {
      throw new Error("id не вказано");
    }

    await Link.findByIdAndRemove(id);
    return { removedId: id, message: "Link success removed" };
  }
}

module.exports = new LinkService();
