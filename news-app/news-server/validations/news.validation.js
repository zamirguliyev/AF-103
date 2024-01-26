const Joi = require("joi");

const NewsValidation = Joi.object({
  title: Joi.string().min(3).required(),
  createdAt: Joi.date().required(),
  linkURL: Joi.string().required,
  thumbnailImg: Joi.string().required(),
  newsBody: Joi.string().required(),
  author: Joi.ObjectId().required(),
});

module.exports = NewsValidation;
