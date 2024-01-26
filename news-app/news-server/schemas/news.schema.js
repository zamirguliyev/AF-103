const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  linkURL: String,
  thumbnailImg: String,
  newsBody: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" }
}, { timestamps: true } );

module.exports = NewsSchema;
