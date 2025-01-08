import mongoose, { Document, Schema } from "mongoose";

interface IMedicalRecord extends Document {
    appointmentId: mongoose.Types.ObjectId;
    diagnosis: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const MedicalRecordSchema: Schema<IMedicalRecord> = new Schema<IMedicalRecord>(
    {
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "Appointment",
            required: [true, "Appointment ID is required"],
        },
        diagnosis: {
            type: String,
            required: [true, "Diagnosis is required"],
            trim: true,
        },
        notes: {
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

const MedicalRecord = mongoose.model<IMedicalRecord>("MedicalRecord", MedicalRecordSchema);
export default MedicalRecord;
