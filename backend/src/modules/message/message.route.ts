import { Router } from "express";
import validate from "../middlewares/validate";
import { messageSchema } from "../validations/message.schema";
import messageController from "../modules/message/controllers/message.controller";

const messageRoute = (router: Router) => {
  router.post("/messages", validate(messageSchema), messageController.create);
};

export default messageRoute;
