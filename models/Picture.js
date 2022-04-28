const { Schema, model, Types } = require("mongoose");

const Picture = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true, unique: true },
});

module.exports = model("Picture", Picture);
