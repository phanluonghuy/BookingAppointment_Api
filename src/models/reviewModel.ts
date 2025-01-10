import mongoose, { Document, Schema } from "mongoose";

interface IReview extends Document {
    doctorId: mongoose.Types.ObjectId;
    averageRating: number;
    ratings: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema<IReview>(
    {
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Doctor ID is required"],
        },
        averageRating: {
            type: Number,
            required: [true, "Average rating is required"],
            min: [0, "Average rating cannot be less than 0"],
            max: [5, "Average rating cannot exceed 5"],
            default: 0,
        },
        ratings: [
            {
                type: Schema.Types.ObjectId,
                ref: "Rating",
                required: true,
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


const Review = mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
