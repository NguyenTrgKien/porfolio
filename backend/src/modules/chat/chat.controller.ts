import { Request, Response } from "express";
import chatService from "./chat.service";

const chatController = {
  getOrCreateVisitor: async (req: Request, res: Response) => {
    const sessionId = await chatService.getOrCreateVisitor(req, res);
    res.json({ sessionId });
  },
};

export default chatController;
