import mongoose, { Document, Schema } from "mongoose";

interface IPrescription extends Document {
    medicalRecordId: mongoose.Types.ObjectId;
    dosageDetails: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const PrescriptionSchema: Schema<IPrescription> = new Schema<IPrescription>(
    {
        medicalRecordId: {
            type: Schema.Types.ObjectId,
            ref: "MedicalRecord",
            required: [true, "Medical record ID is required"],
        },
        dosageDetails: [
            {
                type: Schema.Types.ObjectId,
                ref: "Dosage",
                required: [true, "Dosage details are required"],
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

const Prescription = mongoose.model<IPrescription>(
    "Prescription",
    PrescriptionSchema
);
export default Prescription;
