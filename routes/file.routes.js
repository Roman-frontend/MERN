const { Router } = require("express");
const auth = require("../middleware/auth.middleware.js");
const FileController = require("../Controllers/FileController.js");
const router = Router();

//router.get("/", auth, FileController.getAll);

//router.get("/:id", auth, FileController.getOne);

router.post("/post", FileController.post);

//router.delete("/:id", auth, FileController.delete);

module.exports = router;
