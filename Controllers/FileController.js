const FileService = require("../Service/FileService.js");

class FileController {
  async getAll(req, res) {
    try {
      const pictures = await FileService.getAll();
      return res.json(pictures);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async post(req, res) {
    console.log(req.body);
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

  async delete(req, res) {
    try {
      const result = await FileService.delete(req.params, req.query);
      return res.status(200).json(result);
    } catch (e) {
      console.log("catch in .delete file");
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new FileController();
