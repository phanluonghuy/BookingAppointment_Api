import mongoose, { Document, Schema } from "mongoose";

interface IHealStatus extends Document {
    patient: mongoose.Types.ObjectId;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const HealStatusSchema: Schema<IHealStatus> = new Schema<IHealStatus>(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient ID is required"],
        },
        bloodPressure: {
            type: String,
            trim: true,
            required: false,
        },
        heartRate: {
            type: Number,
            min: [0, "Heart rate cannot be negative"],
            required: false,
        },
        temperature: {
            type: Number,
            min: [0, "Temperature cannot be negative"],
            required: false,
        },
        weight: {
            type: Number,
            min: [0, "Weight cannot be negative"],
            required: false,
        },
        notes: {
            type: String,
            trim: true,
            required: false,
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

const HealStatus = mongoose.model<IHealStatus>("HealStatus", HealStatusSchema);
export default HealStatus;
