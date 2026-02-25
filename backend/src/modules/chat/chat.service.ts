import { Request, Response } from "express";
import prisma from "../../utils/prima";

const chatService = {
  getOrCreateVisitor: async (req: Request, res: Response) => {
    let sessionId = req.cookies["session_id"];

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      res.cookie("session_id", sessionId, {
        maxAge: 60 * 60 * 24 * 7 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      await prisma.visitor.create({
        data: {
          sessionId,
        },
      });
    }

    return sessionId;
  },
};

export default chatService;
