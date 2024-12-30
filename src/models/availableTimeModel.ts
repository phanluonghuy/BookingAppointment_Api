import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the AvailableTime document
interface IAvailableTime extends Document {
    dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
    startTime: string; // In HH:mm format
    endTime: string;   // In HH:mm format
    createdAt: Date;
    updatedAt: Date;
}

// Define the AvailableTime schema
const AvailableTimeSchema: Schema<IAvailableTime> = new Schema<IAvailableTime>(
    {
        dayOfWeek: {
            type: String,
            enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
            required: [true, "Day of the week is required"],
        },
        startTime: {
            type: String,
            required: [true, "Start time is required"],
            validate: {
                validator: (value: string) => /^([01]?\d|2[0-3]):[0-5]\d$/.test(value),
                message: "Start time must be in HH:mm format",
            },
        },
        endTime: {
            type: String,
            required: [true, "End time is required"],
            validate: {
                validator: (value: string) => /^([01]?\d|2[0-3]):[0-5]\d$/.test(value),
                message: "End time must be in HH:mm format",
            },
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

const AvailableTime = mongoose.model<IAvailableTime>("AvailableTime", AvailableTimeSchema);
export default AvailableTime;
