const { Router } = require("express");
const RedirectController = require("../Controllers/RedirectController.js");
const auth = require("../middleware/auth.middleware.js");
const router = Router();

router.get("/:code", auth, RedirectController.get);

module.exports = router;
