import { Request, Response } from "express";
import Medicine from "../models/medicineModel";

export const medicineService = {
    // Create a new medicine with multiple images
    createMedicine: async (req: Request, res: Response): Promise<Response> => {
        const { name, indications, contraindications, sideEffects } = req.body;
        const files = req.files as Express.Multer.File[];

        if (!name) {
            return res.json({
                acknowledgement: false,
                message: "Medicine name is required",
            });
        }

        try {
            const images = files.map((file) => ({
                url: file.path,
                fileName: file.filename,
                fileType: file.mimetype,
            }));

            const medicine = new Medicine({
                name,
                indications,
                contraindications,
                sideEffects,
                images,
            });

            await medicine.save();

            return res.json({
                acknowledgement: true,
                message: "Medicine created successfully",
                data: medicine,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error creating medicine",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get a medicine by ID
    getMedicineById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const medicine = await Medicine.findById(id);

            if (!medicine) {
                return res.json({
                    acknowledgement: false,
                    message: "Medicine not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: medicine,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving medicine",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all medicines
    getAllMedicines: async (req: Request, res: Response): Promise<Response> => {
        try {
            const medicines = await Medicine.find();

            return res.json({
                acknowledgement: true,
                data: medicines,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving medicines",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update a medicine with multiple images
    updateMedicine: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { name, indications, contraindications, sideEffects } = req.body;
        const files = req.files as Express.Multer.File[];

        try {
            const medicine = await Medicine.findById(id);

            if (!medicine) {
                return res.json({
                    acknowledgement: false,
                    message: "Medicine not found",
                });
            }

            if (name) medicine.name = name;
            if (indications) medicine.indications = indications;
            if (contraindications) medicine.contraindications = contraindications;
            if (sideEffects) medicine.sideEffects = sideEffects;

            if (files && files.length > 0) {
                medicine.images = files.map((file) => ({
                    url: file.path,
                    fileName: file.filename,
                    fileType: file.mimetype,
                }));
            }

            medicine.updatedAt = new Date();

            await medicine.save();

            return res.json({
                acknowledgement: true,
                message: "Medicine updated successfully",
                data: medicine,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error updating medicine",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete a medicine
    deleteMedicine: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const deletedMedicine = await Medicine.findByIdAndDelete(id);

            if (!deletedMedicine) {
                return res.json({
                    acknowledgement: false,
                    message: "Medicine not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Medicine deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error deleting medicine",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
