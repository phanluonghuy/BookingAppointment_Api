import { socketController } from "../controllers/socketController";
import { Socket, Server } from "socket.io";

export const socketRoutes = (io: Server, socket: Socket) => {
    socket.on("joinRoom", socketController.joinRoom(io, socket));
    socket.on("leaveRoom", socketController.leaveRoom(io, socket));
    socket.on("getHistory", socketController.getMessages(io, socket));
    socket.on("sendMessage", socketController.sendMessage(io, socket));
    socket.on("seen", socketController.seen(io, socket));
};

// socket.on("typing", socketController.typing(io, socket));
// socket.on("stopTyping", socketController.stopTyping(io, socket));