const { Router } = require("express");
const auth = require("../middleware/auth.middleware.js");
const LinkController = require("../Controllers/LinkController.js");
const router = Router();

router.get("/", auth, LinkController.getAll);

router.get("/:id", auth, LinkController.getOne);

router.post("/generate", auth, LinkController.create);

router.put("/:id", auth, LinkController.update);

router.delete("/:id", auth, LinkController.delete);

module.exports = router;
