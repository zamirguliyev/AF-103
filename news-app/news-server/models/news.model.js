const mongoose = require("mongoose");
const NewsSchema = require("../schemas/news.schema");

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;
