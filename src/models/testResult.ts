import mongoose, { Document, Schema } from "mongoose";

interface ITestResult extends Document {
    medicalRecordId: mongoose.Types.ObjectId;
    testName: string;
    labDetails?: string;
    results: string;
    healStatusId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TestResultSchema: Schema<ITestResult> = new Schema<ITestResult>(
    {
        medicalRecordId: {
            type: Schema.Types.ObjectId,
            ref: "MedicalRecord",
            required: [true, "Medical Record ID is required"],
        },
        testName: {
            type: String,
            required: [true, "Test name is required"],
            trim: true,
        },
        labDetails: {
            type: String,
            required: false,
            trim: true,
        },
        results: {
            type: String,
            required: [true, "Test results are required"],
            trim: true,
        },
        healStatusId: {
            type: Schema.Types.ObjectId,
            ref: "HealStatus",
            required: [true, "Heal Status ID is required"],
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

const TestResult = mongoose.model<ITestResult>("TestResult", TestResultSchema);
export default TestResult;
