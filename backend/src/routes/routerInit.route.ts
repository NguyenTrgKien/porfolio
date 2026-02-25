import { Express } from "express";
import contactRoute from "../modules/contact/contact.route";
import express from "express";
import { chatRoute } from "../modules/chat/chat.route";
import { authRoute } from "../modules/auth/auth.route";

const router = express.Router();

const routerInit = (app: Express) => {
  contactRoute(router);
  chatRoute(router);
  authRoute(router);
  return app.use("/api/v1", router);
};

export default routerInit;
