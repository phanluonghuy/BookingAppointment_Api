import { Server } from "socket.io";
import { socketRoutes } from "../routes/socketRoute";
import {socketController} from "../controllers/socketController";

export const initializeSocket = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            credentials: true
        },
    });

    let onlineUsers: any = {};

    io.on("connection", (socket) => {
        const { userId } = socket.handshake.auth;
        if (userId) {
            if (!onlineUsers[userId]) {
                onlineUsers[userId] = new Set();
            }
            onlineUsers[userId].add(socket.id);

            console.log(`User ${userId} connected with socket ${socket.id}`);
        }

        io.emit('onlineUsers', Object.keys(onlineUsers));


        socket.on("disconnect", (reason, description) => {
            const { userId } = socket.handshake.auth;
            if (userId) {
                if (onlineUsers[userId]) {
                    onlineUsers[userId].delete(socket.id);

                    if (onlineUsers[userId].size === 0) {
                        delete onlineUsers[userId];
                    }
                }

                console.log(`User ${userId} disconnected from socket ${socket.id}`);
            }

            io.emit('onlineUsers', Object.keys(onlineUsers));
        });

        socketRoutes(io, socket)
    });

    return io;
};
