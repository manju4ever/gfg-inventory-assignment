import config from "config";

export default {
  basePath: "/",
  info: {
    title: config.get("app.name"),
    description: config.get("app.description"),
    version: "1.0.0",
    contact: {
      name: "Manjunath Desappa",
      url: "http://github.com/manju4ever",
      email: "dmanjunath@live.com",
    },
    license: {
      name: "UNLICENSED",
    },
  },
};
