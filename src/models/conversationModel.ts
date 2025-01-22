import mongoose, { Document, Schema } from "mongoose";

export interface IConversation extends Document {
    participants: mongoose.Types.ObjectId[];
    lastMessageContent: string;
    lastMessageTimestamp: Date;
    unreadCount: Record<string, number>;
}

const ConversationSchema: Schema<IConversation> = new Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        lastMessageContent: {
            type: String,
            default: "",
        },
        lastMessageTimestamp: {
            type: Date,
            default: Date.now,
        },
        unreadCount: {
            type: Map,
            of: Number,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

const Conversation = mongoose.model<IConversation>("Conversation", ConversationSchema);
export default Conversation;
