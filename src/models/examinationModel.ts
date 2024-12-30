import mongoose, { Document, Schema } from "mongoose";

interface IExamination extends Document {
    medicalRecordId: mongoose.Types.ObjectId;
    notes?: string;
    observations: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ExaminationSchema: Schema<IExamination> = new Schema<IExamination>(
    {
        medicalRecordId: {
            type: Schema.Types.ObjectId,
            ref: "MedicalRecord",
            required: [true, "Medical Record ID is required"],
        },
        notes: {
            type: String,
            required: false,
            trim: true,
        },
        observations: {
            type: [String],
            required: [true, "At least one observation is required"],
            validate: {
                validator: (arr: string[]) => arr.length > 0,
                message: "Observations array cannot be empty",
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

const Examination = mongoose.model<IExamination>("Examination", ExaminationSchema);
export default Examination;
