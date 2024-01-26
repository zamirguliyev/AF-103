const Joi = require("joi");

const SubscriptionValidation = Joi.object({
  userId: Joi.ObjectId().required(),
  publisherId: Joi.ObjectId().required(),
});

module.exports = SubscriptionValidation;
