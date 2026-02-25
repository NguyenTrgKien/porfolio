import { Server, Socket } from "socket.io";
import prisma from "../../../utils/prima";
import * as cookie from "cookie";
import { onlineUsers } from "./onlineUsers";

export const privateChat = (io: Server, socket: Socket) => {
  const cookieHeader = socket.handshake.headers.cookie || "";
  const cookies = cookie.parse(cookieHeader);
  const sessionId = cookies["session_id"];
  const user = socket.data.user;

  if (!user || user.role === "user") {
    if (sessionId) {
      if (!onlineUsers.has(sessionId)) {
        onlineUsers.set(sessionId, new Set());
      }
      onlineUsers.get(sessionId)?.add(socket.id);
      io.to("owner_room").emit("user:online", { sessionId });
    }

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
          messages: [{ role: "owner", content: welcomeMessage }],
        });
        return;
      }

      socket.emit("private_chat:history", {
        messages: existingConversation?.messages,
      });
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

        if (!visitor) {
          socket.disconnect();
          return;
        }

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
          isRead: false,
        },
      });

      await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          lastMessage: message,
          updatedAt: new Date(),
        },
      });

      io.to("owner_room").emit("private_chat:new_message", {
        message,
        conversationId: conversation.id,
      });
    });

    socket.on("disconnect", () => {
      if (!sessionId) return;

      const sockets = onlineUsers.get(sessionId);
      if (!sockets) return;

      sockets.delete(socket.id);

      if (sockets.size === 0) {
        onlineUsers.delete(sessionId);

        io.to("owner_room").emit("user:offline", { sessionId });
      }
    });
  }

  if (user?.role === "admin") {
    socket.on("owner:join", async () => {
      socket.join("owner_room");
      const cookieHeader = socket.handshake.headers.cookie || "";
      const cookies = cookie.parse(cookieHeader);
      const access_token = cookies["access_token"];
      if (!access_token) return;

      const conversations = await prisma.conversation.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          visitor: true,
        },
      });

      socket.emit("private_chat:conversations", {
        conversations: conversations,
      });

      socket.emit("users:online_list", {
        sessionIds: Array.from(onlineUsers.keys()),
      });
    });

    socket.on("owner:select_conversation", async ({ conversationId }) => {
      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: { visitor: true },
      });

      if (!conversation) return;

      socket.join(conversation.visitor.sessionId);

      await prisma.message.updateMany({
        where: {
          conversationId,
          role: "user",
          isRead: false,
        },
        data: { isRead: true },
      });

      const messages = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: "asc" },
      });

      const isOnline = onlineUsers.has(conversation.visitor.sessionId);

      socket.emit("private_chat_admin:history", {
        conversation,
        messages,
        isOnline,
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

        await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            lastMessage: message,
            updatedAt: new Date(),
          },
        });

        io.to(sessionId).emit("private_chat:receive", { message });
      },
    );
  }
};
