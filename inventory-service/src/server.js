import path from "path";
import config from "config";
import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiAuthCookie from "@hapi/cookie";
import Joi from "joi";
import HapiJWTAuth from "hapi-auth-jwt2";

import logger from "~/utils/logger";
import Routes from "~/routes";
import { validateCookie, validateTokenJWT } from "~/security";

const defaultHapiOptions = {
  host: config.get("app.connection.host"),
  port: config.get("app.connection.port"),
  routes: {
    cors: config.get("app.connection.routes.cors"),
    files: {
      relativeTo: path.join(__dirname, "public"),
    },
  },
};

const defaultCookieAuthOptions = {
  cookie: {
    password: config.get("authentication.cookie.password"),
    isSecure: false,
    isSameSite: "Lax",
  },
  validateFunc: validateCookie,
};

const defaultJWTAuthOptions = {
  key: config.get("authentication.jwt.secret"),
  validate: validateTokenJWT,
};

async function init({
  hapiOptions = defaultHapiOptions,
  cookieAuthOptions = defaultCookieAuthOptions,
  jwtAuthOptions = defaultJWTAuthOptions,
}) {
  try {
    // Initial Server Configs
    const server = new Hapi.Server(hapiOptions);

    // Register Plugins
    await server.register([
      Inert,
      Vision,
      HapiAuthCookie,
      {
        plugin: HapiJWTAuth,
      },
    ]);

    server.validator(Joi);

    // Register Authentication
    server.auth.strategy("session", "cookie", cookieAuthOptions);

    server.auth.strategy("jwt", "jwt", jwtAuthOptions);

    server.auth.default("jwt");

    await server.initialize();

    // Register routes
    Routes.forEach((route) => server.route(route));

    // Start the server
    await server.start();

    return server;
  } catch (err) {
    logger.fatal("[Init] Server Initialization Failed:", err);
    return err;
  }
}

export default init.bind(null, {
  hapiOptions: defaultHapiOptions,
  cookieAuthOptions: defaultCookieAuthOptions,
  jwtAuthOptions: defaultJWTAuthOptions,
});
