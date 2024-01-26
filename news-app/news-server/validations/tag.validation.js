const Joi = require("joi");

const TagValidation = Joi.object({
  name: Joi.string().required(),
});

module.exports = TagValidation;
