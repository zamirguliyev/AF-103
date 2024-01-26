const mongoose = require("mongoose");

const TagsSchema = new mongoose.Schema({
  name: String,
});

module.exports = TagsSchema;
