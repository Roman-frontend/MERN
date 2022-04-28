const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const config = require("config");
const Picture = require("../models/Picture.js");

class FileService {
  async getAll() {
    try {
      const pictures = await Picture.find();
      const port = config.get("port");
      const data = pictures.map((p) => {
        const urlPicture = `http://localhost:${port}/${p.picture}`;
        return { _id: p._id, name: p.name, picture: urlPicture };
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async post(file) {
    try {
      const fileName = uuid.v4() + file.name;
      const filePath = path.resolve("uploads", fileName);
      const createdPost = await Picture.create({
        picture: fileName,
        name: file.name,
      });
      console.log(createdPost);
      file.mv(filePath),
        (err) => {
          if (err) throw new Error(err);
        };

      const urlFile = `http://localhost:${config.get("port")}/${fileName}`;
      return {
        status: 200,
        data: {
          fileName: file.name,
          filePath: urlFile,
        },
      };
    } catch (error) {
      console.log("error in FileService => ", error);
    }
  }

  async delete({ id }, { name }) {
    if (!id) {
      throw new Error("id не вказано");
    }

    await Picture.findByIdAndRemove(id);
    const filePath = path.resolve("uploads", name);
    fs.rm(filePath, (err) => {
      console.log("error removing file", err);
    });
    return { removedId: id, message: "File success removed" };
  }
}

module.exports = new FileService();
