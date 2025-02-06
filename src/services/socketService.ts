import Message, { IMessage } from "../models/messageModel";
import Conversation, { IConversation } from "../models/conversationModel";


export const socketService = {
    sendMessage: async (message: IMessage): Promise<any> => {
        const { from, to, content, messageType } = message;

        let conversation = await socketService.getConversation(from.toString(), to.toString());

        if (conversation) {
            conversation.lastMessageContent = messageType === "text" ? content : messageType.charAt(0).toUpperCase() + messageType.slice(1);
            conversation.lastMessageTimestamp = new Date();
            conversation.unreadCount[to.toString()] = (conversation.unreadCount[to.toString()] || 0) + 1;

            await conversation.save();
        }

        const newMessage = await Message.create({
            from,
            to,
            content,
            messageType,
            status: "sent",
        });

        return { conversation, newMessage };
    },

    getMessages: async (conversationId: string): Promise<IMessage[] | null> => {
        const conversation = await Conversation.findOne({ _id: conversationId });

        if (!conversation) {
            console.error("Conversation not found.");
            return null;
        }

        return Message.find({
            $and: [
                { from: { $in: conversation.participants } },
                { to: { $in: conversation.participants } }
            ]
        }).sort({ createdAt: 1 });
    },

    getConversation: async (fromId: string, toId: string): Promise<IConversation | null> => {
        return Conversation.findOne({
            participants: { $all: [fromId, toId] },
        });
    },

    seenMessage: async (userId: string, conversationId: string): Promise<number> => {
        try {
            const messages = await socketService.getMessages(conversationId);

            if (!messages || messages.length === 0) {
                console.warn(`No messages found for conversation ${conversationId}`);
                return 0;
            }

            const messageIdsToUpdate = messages
                .filter((message) => message.to.toString() === userId && message.status !== "read")
                .map((message) => message._id);

            if (messageIdsToUpdate.length === 0) {
                console.log(`No messages to mark as read for user ${userId} in conversation ${conversationId}`);
                return 0;
            }

            const result = await Message.updateMany(
                { _id: { $in: messageIdsToUpdate } },
                { $set: { status: "read" } }
            );

            console.log(`${result.modifiedCount} messages marked as read for user ${userId} in conversation ${conversationId}`);
            return result.modifiedCount;
        } catch (error) {
            console.error("Error marking messages as seen:", error);
            throw error;
        }
    },

};
