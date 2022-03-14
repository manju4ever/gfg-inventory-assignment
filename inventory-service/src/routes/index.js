import Joi from "joi";
import AccountRoutes from "./accounts-route";
import ProductRoutes from "./products-route";

const IndexRoute = {
  path: "/",
  method: "GET",
  config: {
    auth: false,
    description: "This is an entrypoint to beauty.",
    tags: ["api", "public"],
  },
  handler: async (request, h) =>
    h.response({
      message: `Hey there buddy, i'm a simple inventory service. I speak HTTP !`,
    }),
};

const PrivateRoutes = [...ProductRoutes];

const ModifiedPrivateRoutes = PrivateRoutes.map((route) =>
  Object.assign({}, route, {
    config: {
      ...route.config,
      validate: {
        ...route.config.validate,
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      },
    },
  })
);

export default [IndexRoute, ...AccountRoutes, ...ModifiedPrivateRoutes];
