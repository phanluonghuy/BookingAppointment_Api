import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

interface ITestResult extends Document {
    medicalRecordId: mongoose.Types.ObjectId;
    testName: string;
    labDetails?: string;
    results?: { // Optional field
        url: string;
        fileName: string;
        fileType: string;
    };
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
            url: {
                type: String,
                validate: [validator.isURL, "Please provide a valid URL"],
                default: "https://placehold.co/1000x1000/EEE/31343C?font=lato&text=Not%20Found%20File%20Result",
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
        healStatusId: {
            type: Schema.Types.ObjectId,
            ref: "HealStatus",
            required: [true, "Heal Status ID is required"],
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

const TestResult = mongoose.model<ITestResult>("TestResult", TestResultSchema);
export default TestResult;
