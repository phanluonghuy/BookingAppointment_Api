import mongoose, { Document, Schema } from "mongoose";

interface IRating extends Document {
    patientId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const RatingSchema: Schema<IRating> = new Schema<IRating>(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Patient ID is required"],
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },
        comment: {
            type: String,
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

const Rating = mongoose.model<IRating>("Rating", RatingSchema);
export default Rating;
