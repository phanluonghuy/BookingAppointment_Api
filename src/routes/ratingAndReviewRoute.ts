import express from "express";
import { ratingAndReviewController } from "../controllers/ratingAndReviewController";

const ratingAndReviewRouter = express.Router();

// Rating routes
ratingAndReviewRouter.post("/", ratingAndReviewController.createRating);
ratingAndReviewRouter.delete("/rating/:ratingId/doctor/:doctorId", ratingAndReviewController.deleteRating);

// Review routes
ratingAndReviewRouter.get("/doctor/:doctorId", ratingAndReviewController.getReviewByDoctor);

export default ratingAndReviewRouter;
