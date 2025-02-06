import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
    content: string;
    messageType: "text" | "image" | "video";
    status: "sent" | "delivered" | "read";
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        content: {
            type: String,
            required: true,
        },
        messageType: {
            type: String,
            enum: ["text", "image", "video"],
            default: "text",
        },
        status: {
            type: String,
            enum: ["sent", "delivered", "read"],
            default: "sent",
        },
    },
    {
        timestamps: true,
    }
);

MessageSchema.index({ from: 1, to: 1 });

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
