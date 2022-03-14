import Joi from "joi";

export default Joi.object({
  title: Joi.string()
    .min(3)
    .max(150)
    .required()
    .description("Name of the product"),
  brand: Joi.string()
    .min(3)
    .max(150)
    .required()
    .description("Brand of the product"),
  price: Joi.number()
    .precision(2)
    .min(0.1)
    .required()
    .max(999999)
    .description("Actual price of the product"),
  sale_price: Joi.number()
    .precision(2)
    .required()
    .min(0.1)
    .max(999999)
    .description("Sale price of the product"),
  stock: Joi.number()
    .integer()
    .required()
    .max(99999)
    .description("Total quantity in stock"),
}).label("Product");
