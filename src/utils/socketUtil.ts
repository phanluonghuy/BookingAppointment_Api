import { Server } from "socket.io";
import { socketRoutes } from "../routes/socketRoute";

export const initializeSocket = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            credentials: true
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        const {userId} = socket.handshake.auth
        console.log("User ID:", userId);

        socketRoutes(io, socket);
    });

    return io;
};
