import { Server, Socket } from "socket.io";
import prisma from "../../../utils/prima";
import * as cookie from "cookie";

export const privateChat = (io: Server, socket: Socket) => {
  const cookieHeader = socket.handshake.headers.cookie || "";
  const cookies = cookie.parse(cookieHeader);
  const sessionId = cookies["session_id"];

  socket.on("private_chat:join", async () => {
    if (!sessionId) {
      socket.disconnect();
      return;
    }
    socket.join(sessionId);

    const visitor = await prisma.visitor.findUnique({ where: { sessionId } });
    if (!visitor) return;

    const existingConversation = await prisma.conversation.findFirst({
      where: { visitorId: visitor.id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!existingConversation) {
      const conversation = await prisma.conversation.create({
        data: { visitorId: visitor.id },
      });

      const welcomeMessage = "Hello, how can I help you?";

      await prisma.message.create({
        data: {
          role: "owner",
          content: welcomeMessage,
          conversationId: conversation.id,
        },
      });

      socket.emit("private_chat:history", {
        message: [{ role: "owner", content: welcomeMessage }],
      });
      return;
    }

    socket.emit("private_chat:history", {
      messages: existingConversation?.messages,
    });
  });

  socket.on("owner:join", () => {
    socket.join("owner_room");
    
  });

  socket.on("private_chat:send", async ({ message }: { message: string }) => {
    let conversation = await prisma.conversation.findFirst({
      where: {
        visitor: { sessionId },
      },
    });

    if (!conversation) {
      const visitor = await prisma.visitor.findUnique({
        where: { sessionId },
      });
      conversation = await prisma.conversation.create({
        data: {
          visitorId: visitor!.id,
        },
      });
    }

    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        conversationId: conversation.id,
      },
    });

    io.to("owner_room").emit("private_chat:new_message", {
      sessionId,
      message,
      conversationId: conversation.id,
    });
  });

  socket.on(
    "private_chat:reply",
    async ({ sessionId, message, conversationId }) => {
      await prisma.message.create({
        data: {
          content: message,
          role: "owner",
          conversationId: conversationId,
        },
      });

      io.to(sessionId).emit("private_chat:receive", { message });
    },
  );
};
