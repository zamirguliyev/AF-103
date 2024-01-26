const mongoose = require("mongoose");
const PublisherSchema = require("../schemas/publishers.schema");

const PublisherModel = mongoose.model("Publisher", PublisherSchema);

module.exports = PublisherModel;
