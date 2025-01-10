import mongoose, { Document, Schema } from "mongoose";

interface IQualification extends Document {
    degree: string;
    institution: string;
    year: number;
    certificateNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

const QualificationSchema: Schema<IQualification> = new Schema<IQualification>(
    {
        degree: {
            type: String,
            required: [true, "Degree is required"],
        },
        institution: {
            type: String,
            required: [true, "Institution is required"],
        },
        year: {
            type: Number,
            required: [true, "Year is required"],
            validate: {
                validator: (value: number) => Number.isInteger(value) && value > 0,
                message: "Year must be a positive integer",
            },
        },
        certificateNumber: {
            type: String,
            required: [true, "Certificate number is required"],
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

const Qualification = mongoose.model<IQualification>("Qualification", QualificationSchema);
export default Qualification;
