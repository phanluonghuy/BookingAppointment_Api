import { Request, Response } from "express";
import Examination from "../models/examinationModel";

export const examinationService = {
    // Create a new examination
    createExamination: async (req: Request, res: Response): Promise<Response> => {
        const { medicalRecordId, notes, observations } = req.body;

        if (!medicalRecordId || !observations || !Array.isArray(observations) || observations.length === 0) {
            return res.json({
                acknowledgement: false,
                message: "Medical Record ID and at least one observation are required",
            });
        }

        try {
            const examination = new Examination({
                medicalRecordId,
                notes,
                observations,
            });

            await examination.save();

            return res.json({
                acknowledgement: true,
                message: "Examination created successfully",
                data: examination,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error creating examination",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get an examination by ID
    getExaminationById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const examination = await Examination.findById(id);

            if (!examination) {
                return res.json({
                    acknowledgement: false,
                    message: "Examination not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: examination,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving examination",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get examinations by Medical Record ID
    getExaminationsByMedicalRecord: async (req: Request, res: Response): Promise<Response> => {
        const { medicalRecordId } = req.params;

        try {
            const examinations = await Examination.find({ medicalRecordId });

            if (!examinations || examinations.length === 0) {
                return res.json({
                    acknowledgement: false,
                    message: "No examinations found for this Medical Record",
                });
            }

            return res.json({
                acknowledgement: true,
                data: examinations,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving examinations",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update an examination
    updateExamination: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { notes, observations } = req.body;

        try {
            const examination = await Examination.findById(id);

            if (!examination) {
                return res.json({
                    acknowledgement: false,
                    message: "Examination not found",
                });
            }

            if (observations && (!Array.isArray(observations) || observations.length === 0)) {
                return res.json({
                    acknowledgement: false,
                    message: "Observations must be a non-empty array",
                });
            }

            examination.notes = notes ?? examination.notes;
            examination.observations = observations ?? examination.observations;
            examination.updatedAt = new Date();

            await examination.save();

            return res.json({
                acknowledgement: true,
                message: "Examination updated successfully",
                data: examination,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error updating examination",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete an examination
    deleteExamination: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const deletedExamination = await Examination.findByIdAndDelete(id);

            if (!deletedExamination) {
                return res.json({
                    acknowledgement: false,
                    message: "Examination not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Examination deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error deleting examination",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
