const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
});

module.exports = SubscriptionSchema;
