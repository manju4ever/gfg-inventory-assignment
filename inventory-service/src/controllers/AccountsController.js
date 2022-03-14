import { iam } from "~/persistence";
import jwt from "jsonwebtoken";
import Crypto from "crypto-js";

const SECRET_KEY = require("config").get("authentication.jwt.secret");

const issueToken = (data = {}) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: "10m" });

export default {
  register: async ({ payload: userDetails }, h) => {
    try {
      await iam.insert({
        ...userDetails,
        password: Crypto.SHA256(userDetails.password).toString(),
      });
      return h.response().code(200);
    } catch (err) {
      logger.error(err);
      return h.response({ message: "Please try again !" }).code(500);
    }
  },
  login: async ({ payload: loginInfo }, h) => {
    try {
      const { email, password } = loginInfo;
      const userInfo = await iam.findOne({ email }).execAsync();
      logger.debug("# Trying to login", loginInfo, userInfo);
      if (!userInfo.email)
        return h
          .response({ internalCode: "401.1", message: "User not found !" })
          .code(401);
      if (!(userInfo.password === (await Crypto.SHA256(password).toString())))
        return h
          .response({ internalCode: "401.2", message: "Bad login info !" })
          .code(401);

      return h.response().header("x-auth-token", issueToken()).code(200);
    } catch (err) {
      logger.error(err);
      return h.response({ message: "Please try again !" }).code(500);
    }
  },
};
