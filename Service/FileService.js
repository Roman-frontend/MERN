const path = require("path");
const uuid = require("uuid");
const config = require("config");
const Picture = require("../models/Picture.js");

class FileService {
  async post(file) {
    try {
      const fileName = uuid.v4() + file.name;
      const filePath = path.resolve("client", "public", "uploads", fileName);
      //const createdPost = await Picture.create({ picture: fileName });
      //console.log(createdPost);
      file.mv(filePath),
        (err) => {
          if (err) throw new Error(err);
        };

      const srcFile = config.get("port") + fileName;
      return {
        status: 200,
        data: {
          fileName: file.name,
          filePath: `/uploads/${file.name}`,
          srcFile: srcFile,
        },
      };
    } catch (error) {
      console.log("error in FileService => ", error);
    }
  }
}

module.exports = new FileService();
