import mongoose, { Document, Schema } from "mongoose";

interface IAppointment extends Document {
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    appointmentDate: Date;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    symptoms: string;
    notes?: string;
    queueNumber: number;
    priority: "low" | "medium" | "high";
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema: Schema<IAppointment> = new Schema<IAppointment>(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient ID is required"],
        },
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Doctor ID is required"],
        },
        appointmentDate: {
            type: Date,
            required: [true, "Appointment date is required"],
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        symptoms: {
            type: String,
            required: [true, "Symptoms description is required"],
        },
        notes: {
            type: String,
            required: false,
        },
        queueNumber: {
            type: Number,
            required: true,
            min: [1, "Queue number must be at least 1"],
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
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

const Appointment = mongoose.model<IAppointment>("Appointment", AppointmentSchema);
export default Appointment;
