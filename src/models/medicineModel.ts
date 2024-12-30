import mongoose, { Document, Schema } from "mongoose";

interface IMedicine extends Document {
    name: string;
    image: string;
    indications: string;
    contraindications: string;
    sideEffects: string;
    createdAt: Date;
    updatedAt: Date;
}

const MedicineSchema: Schema<IMedicine> = new Schema<IMedicine>(
    {
        name: {
            type: String,
            required: [true, "Medicine name is required"],
            trim: true,
        },
        image: {
            type: String,
            required: false,
            trim: true,
        },
        indications: {
            type: String,
            required: false,
            trim: true,
        },
        contraindications: {
            type: String,
            required: false,
            trim: true,
        },
        sideEffects: {
            type: String,
            required: false,
            trim: true,
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

const Medicine = mongoose.model<IMedicine>("Medicine", MedicineSchema);
export default Medicine;
