import { Request, Response } from "express";
import Rating from "../models/ratingModel";
import Review from "../models/reviewModel";
import mongoose from "mongoose";

export const ratingAndReviewService = {
    createRating: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId, rating, comment, doctorId } = req.body;

            if (!patientId || !rating || !doctorId) {
                return res.json({
                    acknowledgement: false,
                    message: "Patient ID, rating, and doctor ID are required",
                });
            }

            const newRating = new Rating({
                patientId,
                rating,
                comment,
            });

            await newRating.save();

            let review = await Review.findOne({ doctorId });
            if (!review) {
                review = new Review({ doctorId });
            }

            review.ratings.push(newRating._id as mongoose.Types.ObjectId);

            const ratings = await Rating.find({ _id: { $in: review.ratings } });
            review.averageRating =
                ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

            await review.save();

            return res.json({
                acknowledgement: true,
                message: "Rating created successfully",
                data: newRating,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error creating rating",
                description: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },

    deleteRating: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { ratingId, doctorId } = req.params;

            const deletedRating = await Rating.findByIdAndDelete(ratingId);
            if (!deletedRating) {
                return res.json({
                    acknowledgement: false,
                    message: "Rating not found",
                });
            }

            const review = await Review.findOne({ doctorId });
            if (review) {
                review.ratings = review.ratings.filter(
                    (rId) => rId.toString() !== ratingId
                );

                const ratings = await Rating.find({ _id: { $in: review.ratings } });
                review.averageRating =
                    ratings.reduce((sum, r) => sum + r.rating, 0) /
                    (ratings.length || 1);

                await review.save();
            }

            return res.json({
                acknowledgement: true,
                message: "Rating deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error deleting rating",
                description: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },

    getReviewByDoctor: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { doctorId } = req.params;

            const review = await Review.findOne({ doctorId }).populate("ratings");

            if (!review) {
                return res.json({
                    acknowledgement: false,
                    message: "Review not found for this doctor",
                });
            }

            return res.json({
                acknowledgement: true,
                data: review,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error fetching review",
                description: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
};
