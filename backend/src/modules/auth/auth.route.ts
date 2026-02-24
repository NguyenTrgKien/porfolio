import { Router } from "express";
import authController from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const authRoute = (router: Router) => {
  router.post("/auth/login", authController.login);
  router.get("/auth/me", authMiddleware, authController.getMe);
};
