import mongoose, { Document, Schema } from "mongoose";

interface IAllergy extends Document {
    patientId: mongoose.Types.ObjectId;
    allergen: string;
    reaction: string;
    severity: "mild" | "moderate" | "severe";
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

const AllergySchema: Schema<IAllergy> = new Schema<IAllergy>(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient ID is required"],
        },
        allergen: {
            type: String,
            required: [true, "Allergen is required"],
        },
        reaction: {
            type: String,
            required: [true, "Reaction is required"],
        },
        severity: {
            type: String,
            enum: ["mild", "moderate", "severe"],
            required: [true, "Severity is required"],
        },
        notes: {
            type: String,
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

const Allergy = mongoose.model<IAllergy>("Allergy", AllergySchema);
export default Allergy;
