import Joi from "joi";

const ProductValidation = Joi.object({
  title: Joi.string().min(3).required(),
  productImg: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  perStock: Joi.number().min(0).required(),
});

export default ProductValidation;
