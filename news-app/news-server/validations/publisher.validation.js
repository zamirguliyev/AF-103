const Joi = require("joi");

const PublihserValidation = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  backgroundImg: Joi.string(),
  profileImg: Joi.string(),
  name: Joi.string().required(),
  description: Joi.string(),
  joinedDate: Joi.date().required(),
});

module.exports = PublihserValidation;
