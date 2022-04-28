const { Schema, model, Types } = require("mongoose");

const Picture = new Schema({
  picture: { type: String },
});

module.exports = model("Picture", Picture);
