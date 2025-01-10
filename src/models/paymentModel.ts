import mongoose, { Document, Schema } from "mongoose";

interface IPayment extends Document {
    patientId: mongoose.Types.ObjectId;
    appointmentId: mongoose.Types.ObjectId;
    amount: number;
    advanceAmount: number;
    finalAmount: number;
    isInsuranceUsed: boolean;
    insuranceCoverage?: number;
    refundAmount?: number;
    paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "cash";
    paymentStatus: "pending" | "completed" | "failed";
    refundStatus: "none" | "pending" | "completed" | "failed";
    transactionId: string;
    paymentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema<IPayment>(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient ID is required"],
        },
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "Appointment",
            required: [true, "Appointment ID is required"],
        },
        amount: {
            type: Number,
            required: [true, "Total amount is required"],
            min: [0, "Amount cannot be negative"],
        },
        advanceAmount: {
            type: Number,
            required: [true, "Advance amount is required"],
            min: [0, "Advance amount cannot be negative"],
        },
        finalAmount: {
            type: Number,
            required: [true, "Final amount is required"],
            min: [0, "Final amount cannot be negative"],
        },
        isInsuranceUsed: {
            type: Boolean,
            required: true,
            default: false
        },
        insuranceCoverage: {
            type: Number,
            required: function () {
                return this.isInsuranceUsed;
            },
            min: [0, "Insurance coverage cannot be negative"],
        },
        refundAmount: {
            type: Number,
            required: false,
            min: [0, "Refund amount cannot be negative"],
        },
        paymentMethod: {
            type: String,
            enum: ["credit_card", "paypal", "bank_transfer", "cash"],
            required: [true, "Payment method is required"],
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        refundStatus: {
            type: String,
            enum: ["none", "pending", "completed", "failed"],
            default: "none",
        },
        transactionId: {
            type: String,
            required: [true, "Transaction ID is required"],
            unique: true,
        },
        paymentDate: {
            type: Date,
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

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
