import { Router } from "express";
import chatController from "./chat.controller";
// import { authMiddleware } from "../../middlewares/auth.middleware";

export const chatRoute = (router: Router) => {
  router.get("/chat/session", chatController.getOrCreateVisitor);

  // router.get("/chat/conversations", authMiddleware, getAllConversations);
};
