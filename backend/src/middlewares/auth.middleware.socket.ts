import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const middlewareSocket = (io: Server) => {
  io.use(async (socket, next) => {
    const cookieHeader = socket.handshake.headers.cookie || "";
    const cookies = cookie.parse(cookieHeader);
    const access_token = cookies["access_token"];

    if (!access_token) return next();

    try {
      const user = jwt.verify(access_token, process.env.JWT_SECRET!);
      socket.data.user = user;
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });
};
