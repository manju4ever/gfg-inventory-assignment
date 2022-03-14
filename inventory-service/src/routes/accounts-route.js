import Joi from "joi";
import UserIAMSchema from "~/schemas/User.js";
import AccountsController from "~/controllers/AccountsController";

export default [
  {
    path: "/register",
    method: "POST",
    config: {
      auth: false,
      description: "Register a new user",
      tags: ["api", "account"],
      validate: {
        payload: UserIAMSchema,
      },
      handler: AccountsController.register,
    },
  },
  {
    path: "/login",
    method: "POST",
    config: {
      auth: false,
      description: "This is to authenticate a user",
      tags: ["api", "account"],
      validate: {
        payload: Joi.object()
          .keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(30).required(),
          })
          .label("Login"),
      },
    },
    handler: AccountsController.login,
  },
];
