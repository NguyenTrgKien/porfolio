import { Server, Socket } from "socket.io";
import { privateChat } from "./privateChat";

export default function registerChatSocket(io: Server, socket: Socket) {
  privateChat(io, socket);
}
