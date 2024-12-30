import mongoose, { Document, Schema } from "mongoose";

interface IWorkSchedule extends Document {
    doctorId: mongoose.Types.ObjectId;
    availableTimes: mongoose.Types.ObjectId[];
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
                type: Schema.Types.ObjectId,
                ref: "AvailableTime",
                required: true,
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
