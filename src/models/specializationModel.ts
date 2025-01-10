import mongoose, { Document, Schema } from "mongoose";

interface ISpecialization extends Document {
    doctorId: mongoose.Types.ObjectId;
    specializations: string[];
    qualifications: {
        degree: string;
        institution: string;
        year: number;
        certificateNumber: string;
    }[];
    experienceYears: number;
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
