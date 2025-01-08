import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

interface IMedicine extends Document {
    name: string;
    images?: {
        url: string;
        fileName: string;
        fileType: string;
    }[];
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
        images: [
            {
                url: {
                    type: String,
                    validate: [validator.isURL, "Please provide a valid URL"],
                    default: "https://placehold.co/1000x1000/EEE/31343C?font=lato&text=Not%20Found%20Image",
                },
                fileName: {
                    type: String,
                    default: "N/A",
                },
                fileType: {
                    type: String,
                    default: "N/A",
                },
            },
        ],
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

MedicineSchema.path('images').validate(function (value: { url: string; fileName: string; fileType: string }[]) {
    return !(value && value.length > 5);
}, "Won't be able to add more than 5 image items");

const Medicine = mongoose.model<IMedicine>("Medicine", MedicineSchema);
export default Medicine;

