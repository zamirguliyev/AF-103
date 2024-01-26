const mongoose = require("mongoose");
const TagsSchema = require("../schemas/tags.schema");

const TagsModel = mongoose.model("Tags", TagsSchema);

module.exports = TagsModel;
