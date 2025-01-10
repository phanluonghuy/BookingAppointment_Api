import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Notification document
interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    prescriptionId?: mongoose.Types.ObjectId;
    paymentId?: mongoose.Types.ObjectId;
    appointmentId?: mongoose.Types.ObjectId;
    notificationType: "appointment" | "payment" | "reminder" | "system";
    message: string;
    status: "unread" | "read";
    createdAt: Date;
    updatedAt: Date;
}

// Define the Notification schema
const NotificationSchema: Schema<INotification> = new Schema<INotification>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        prescriptionId: {
            type: Schema.Types.ObjectId,
            ref: "Prescription",
            required: false,
        },
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: "Payment",
            required: false,
        },
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "Appointment",
            required: false,
        },
        notificationType: {
            type: String,
            enum: ["appointment", "payment", "reminder", "system"],
            required: [true, "Notification type is required"],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["unread", "read"],
            default: "unread",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
export default Notification;
