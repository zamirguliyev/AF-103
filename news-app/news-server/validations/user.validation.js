const Joi = require("joi");

const UserValidation = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  fullName: Joi.string().min(3).max(30).required(),
  profileImg: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  isAdmin: Joi.boolean(),
});

module.exports = UserValidation;
