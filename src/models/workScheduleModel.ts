import mongoose, { Document, Schema } from "mongoose";

interface IWorkSchedule extends Document {
    doctorId: mongoose.Types.ObjectId;
    availableTimes: {
        dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
        startTime: string;
        endTime: string;
        restTime: string[];
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const WorkScheduleSchema: Schema<IWorkSchedule> = new Schema<IWorkSchedule>(
    {
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor ID is required"],
        },
        availableTimes: [
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
                restTime: {
                    type: [String],
                    required: true,
                    validate: {
                        validator: (values: string[]) =>
                            values.every((value) => /^([01]?\d|2[0-3]):[0-5]\d$/.test(value)),
                        message: "Each rest time must be in HH:mm format",
                    },
                },
            },
        ],
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

const WorkSchedule = mongoose.model<IWorkSchedule>("WorkSchedule", WorkScheduleSchema);
export default WorkSchedule;
