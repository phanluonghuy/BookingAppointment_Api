import { socketService } from "../services/socketService";
import {Server, Socket} from "socket.io";

export const socketController = {
    joinRoom: (io: Server, socket: Socket) => (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} joined room ${conversationId}`);
    },

    leaveRoom: (io: Server, socket: Socket) => (conversationId: string) => {
        socket.leave(conversationId);
        console.log(`Socket ${socket.id} left room ${conversationId}`);
    },

    sendMessage: (io: Server, socket: Socket) => async (data: any) => {
        try {
            const { conversation, newMessage } = await socketService.sendMessage(data);

            if (!conversation) {
                console.error("Conversation not found or failed to create.");
                return;
            }

            if (!newMessage) {
                console.error("Message creation failed.");
                return;
            }

            io.to(conversation.id).emit("newMessage", newMessage);

            console.log(`Message sent to room ${conversation.id}`);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },

    getMessages: (io: Server, socket: Socket) => async (conversationId: string) => {
        try {
            const messages = await socketService.getMessages(conversationId) ?? [];

            io.to(conversationId).emit("showHistory", messages);
            console.log(`Histories sent to room ${conversationId}`);
        } catch (error) {
            console.error("Error retrieving messages:", error);
        }
    },

    disconnect: (io: Server, socket: Socket) => () => {
        console.log("Client disconnected:", socket.id);
    },
};
