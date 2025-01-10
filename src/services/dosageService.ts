import { Request, Response } from "express";
import Dosage from "../models/dosageModel";

export const dosageService = {
    // Create dosage
    createDosage: async (req: Request, res: Response): Promise<Response> => {
        const {
            medicineId,
            amountPerDose,
            frequencyPerDay,
            times,
            description,
            duration,
        } = req.body;

        if (!medicineId || !amountPerDose || !frequencyPerDay || !times || !duration) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Missing required fields: medicineId, amountPerDose, frequencyPerDay, times, or duration",
            });
        }

        try {
            const dosage = new Dosage({
                medicineId,
                amountPerDose,
                frequencyPerDay,
                times,
                description,
                duration,
            });

            await dosage.save();

            return res.status(201).json({
                acknowledgement: true,
                message: "Dosage created successfully",
                data: dosage,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error creating dosage",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get dosage by ID
    getDosageById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const dosage = await Dosage.findById(id).populate("medicineId");

            if (!dosage) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Dosage not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                data: dosage,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving dosage",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all dosages
    getAllDosages: async (_: Request, res: Response): Promise<Response> => {
        try {
            const dosages = await Dosage.find().populate("medicineId");

            return res.status(200).json({
                acknowledgement: true,
                data: dosages,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving dosages",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update dosage
    updateDosage: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { amountPerDose, frequencyPerDay, times, description, duration } = req.body;

        try {
            const dosage = await Dosage.findById(id);

            if (!dosage) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Dosage not found",
                });
            }

            if (amountPerDose) dosage.amountPerDose = amountPerDose;
            if (frequencyPerDay) dosage.frequencyPerDay = frequencyPerDay;
            if (times) dosage.times = times;
            if (description) dosage.description = description;
            if (duration) dosage.duration = duration;

            dosage.updatedAt = new Date();

            await dosage.save();

            return res.status(200).json({
                acknowledgement: true,
                message: "Dosage updated successfully",
                data: dosage,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error updating dosage",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete dosage
    deleteDosage: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const dosage = await Dosage.findByIdAndDelete(id);

            if (!dosage) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Dosage not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                message: "Dosage deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error deleting dosage",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
