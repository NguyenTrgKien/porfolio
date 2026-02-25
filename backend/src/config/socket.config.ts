import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";
import registerChatSocket from "../modules/chat/sockets/registerChatSocket";

export const initSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://porfolio-rho-one.vercel.app"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    registerChatSocket(io, socket);
  });

  return io;
};
