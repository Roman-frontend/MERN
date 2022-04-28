const LinkService = require("../Service/LinkService.js");

class LinkController {
  async getAll(req, res) {
    try {
      const links = await LinkService.getAll(req.query);
      return res.json(links);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getOne(req, res) {
    try {
      const link = await LinkService.getOne(req.params);
      return res.json(link);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async create(req, res) {
    try {
      const link = await LinkService.create(req.body, req.user);
      return res.json(link);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async update(req, res) {
    try {
      const link = await LinkService.update(req.params, req.body);
      console.log("link => ", link);
      return res.json(link);
    } catch (e) {
      console.log("e in update of LinkController => ", e.message);
      return res.status(500).json({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      console.log("remove method ... ");
      const result = await LinkService.delete(req.params);
      return res.status(200).json(result);
    } catch (e) {
      console.log("catch in .delete link");
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new LinkController();
