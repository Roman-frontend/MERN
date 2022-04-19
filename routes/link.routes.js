const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link.js");
const auth = require("../middleware/auth.middleware.js");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    console.log("/generate... ", from, code, baseUrl);
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    console.log("req.user.userId... ", req.user.userId);

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();
    console.log("generate link... ", link);

    // const links = await Link.find();
    // console.log("generate link... ", link, "links... ", links);

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find();
    if (req.query.hasOwnProperty("limit") && req.query.limit !== "null") {
      const parsedLimit = parseInt(req.query.limit);
      const limitedLinks = [];
      for (let i = 0; i < parsedLimit; i++) {
        if (links[i]) limitedLinks.push(links[i]);
      }
      res.json(limitedLinks);
    } else {
      res.json(links);
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    //console.log("link in PUT /:id... ", link);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    //console.log("/:id... ", req.params.id, req.body);
    Link.findOneAndUpdate(
      { _id: req.params.id },
      { from: req.body.name },
      { useFindAndModify: false, new: true },
      (err, data) => {
        if (err) {
          res
            .status(403)
            .json({ message: "Повідомлення не змінене", error: err });
        } else {
          res.json(data);
        }
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Link.findByIdAndRemove(req.params.id);
    res
      .status(201)
      .json({ removedId: req.params.id, message: "Link success removed" });
  } catch (e) {
    console.log("catch in .delete link");
    res.status(500).json({ message: "Что-то пошло не так " });
  }
});

module.exports = router;
