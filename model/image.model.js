// image schema

const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  user_id: String,
});

const Images = mongoose.model("Image", ImageSchema);
module.exports = Images;
