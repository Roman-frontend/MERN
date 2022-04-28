const FileService = require("../Service/FileService.js");

class FileController {
  async post(req, res) {
    try {
      if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
      }

      const result = await FileService.post(req.files.file);
      console.log("result in post of FileController => ", result);
      res.status(result.status).json(result.data);
    } catch (e) {
      console.log("e in post of FileController => ", e.message);
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new FileController();
