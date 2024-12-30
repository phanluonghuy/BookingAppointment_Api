import mongoose, { Document, Schema } from "mongoose";

interface ISpecialization extends Document {
    doctorId: mongoose.Types.ObjectId;
    specializations: string[];
    qualifications: mongoose.Types.ObjectId[];
    experienceYears: number;
    licenseNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

const SpecializationSchema: Schema<ISpecialization> = new Schema<ISpecialization>(
    {
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor ID is required"],
        },
        specializations: [
            {
                type: String,
                required: [true, "At least one specialization is required"],
            },
        ],
        qualifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Qualification",
            },
        ],
        experienceYears: {
            type: Number,
            required: [true, "Experience years are required"],
            validate: {
                validator: (value: number) => Number.isInteger(value) && value >= 0,
                message: "Experience years must be a non-negative integer",
            },
        },
        licenseNumber: {
            type: String,
            required: [true, "License number is required"],
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

const Specialization = mongoose.model<ISpecialization>("Specialization", SpecializationSchema);
export default Specialization;