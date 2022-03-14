import Joi from "joi";

import { Product } from "~/schemas";
import ProductsController from "~/controllers/ProductsController";

export default [
  {
    path: "/products",
    method: "POST",
    config: {
      description: "Add multiple products",
      tags: ["api", "products"],
      validate: {
        payload: Joi.array()
          .min(1)
          .max(100)
          .required()
          .items(Product)
          .label("ProductList"),
      },
    },
    handler: ProductsController.addProducts,
  },
  {
    path: "/product/{product_id}",
    method: "PUT",
    config: {
      description: "Edit product information",
      tags: ["api", "products"],
      validate: {
        payload: Product,
        params: {
          product_id: Joi.string().max(8).required(),
        },
      },
    },
    handler: ProductsController.updateProduct,
  },
  {
    path: "/products",
    method: "GET",
    config: {
      description: "Get all products in the inventory",
      tags: ["api", "products"],
    },
    handler: ProductsController.getAllProducts,
  },
];
