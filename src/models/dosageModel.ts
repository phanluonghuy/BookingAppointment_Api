import mongoose, { Document, Schema } from "mongoose";

interface IDosage extends Document {
    medicineId: mongoose.Types.ObjectId;
    amountPerDose: number;
    frequencyPerDay: number;
    times: { time: "morning" | "afternoon" | "evening" | "night" }[];
    description?: string;
    duration: number;
    status: "active" | "completed" | "expired";
    createdAt: Date;
    updatedAt: Date;
}

const DosageSchema: Schema<IDosage> = new Schema<IDosage>(
    {
        medicineId: {
            type: Schema.Types.ObjectId,
            ref: "Medicine",
            required: [true, "Medicine ID is required"],
        },
        amountPerDose: {
            type: Number,
            required: [true, "Amount per dose is required"],
            min: [1, "Amount per dose must be at least 1"],
        },
        frequencyPerDay: {
            type: Number,
            required: [true, "Frequency per day is required"],
            min: [1, "Frequency per day must be at least 1"],
        },
        times: [
            {
                time: {
                    type: String,
                    enum: ["morning", "afternoon", "evening", "night"],
                    required: [true, "Time is required"],
                },
            },
        ],
        description: {
            type: String,
            trim: true,
            required: false,
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
            min: [1, "Duration must be at least 1 day"],
        },
        status: {
            type: String,
            enum: ["active", "completed", "expired"],
            default: "active",
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

const Dosage = mongoose.model<IDosage>("Dosage", DosageSchema);
export default Dosage;
