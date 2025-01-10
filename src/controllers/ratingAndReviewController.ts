import { Request, Response, NextFunction } from "express";
import { ratingAndReviewService } from "../services/ratingAndReviewService";

export const ratingAndReviewController = {
    createRating: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await ratingAndReviewService.createRating(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    deleteRating: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await ratingAndReviewService.deleteRating(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    getReviewByDoctor: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await ratingAndReviewService.getReviewByDoctor(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },
};
