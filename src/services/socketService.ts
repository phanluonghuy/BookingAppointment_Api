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
        });
    },

    getConversation: async (fromId: string, toId: string): Promise<IConversation | null> => {
        return Conversation.findOne({
            participants: { $all: [fromId, toId] },
        });
    },
};
