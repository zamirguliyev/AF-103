const mongoose = require("mongoose");

const SubscriptionSchema = require("../schemas/subscriptions.schema");

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);

module.exports = SubscriptionModel;
