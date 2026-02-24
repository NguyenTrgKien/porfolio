import { Router } from "express";
import validate from "../../middlewares/validate";
import { contactSchema } from "../../validations/contact.schema";
import contactController from "./contact.controller";

const contacRoute = (router: Router) => {
  router.get("/", () => {});
  router.post("/contact", validate(contactSchema), contactController.create);
};

export default contacRoute;
