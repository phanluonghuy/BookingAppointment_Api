import { Request, Response } from "express";
import Allergy from "../models/allergyModel";

export const allergyService = {
    // Tạo mới một allergy
    createAllergy: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId, allergen, reaction, severity, notes } = req.body;
            const newAllergy = await Allergy.create({ patientId, allergen, reaction, severity, notes });
            return res.status(201).json({
                acknowledgement: true,
                message: "Allergy created successfully",
                data: newAllergy,
            });
        } catch (error) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Lấy danh sách allergy của một bệnh nhân
    getAllergiesByPatient: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId } = req.params;
            const allergies = await Allergy.find({ patientId }).sort({ createdAt: -1 });
            return res.status(200).json({
                acknowledgement: true,
                message: "Allergies fetched successfully",
                data: allergies,
            });
        } catch (error) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Lấy thông tin allergy cụ thể theo ID
    getAllergyById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const allergy = await Allergy.findById(id);
            if (!allergy) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Allergy not found",
                });
            }
            return res.status(200).json({
                acknowledgement: true,
                message: "Allergy fetched successfully",
                data: allergy,
            });
        } catch (error) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Cập nhật allergy theo ID
    updateAllergy: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedAllergy = await Allergy.findByIdAndUpdate(
                id,
                { ...updates, updatedAt: new Date() },
                { new: true, runValidators: true }
            );
            if (!updatedAllergy) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Allergy not found",
                });
            }
            return res.status(200).json({
                acknowledgement: true,
                message: "Allergy updated successfully",
                data: updatedAllergy,
            });
        } catch (error) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Xóa allergy theo ID
    deleteAllergy: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const deletedAllergy = await Allergy.findByIdAndDelete(id);
            if (!deletedAllergy) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Allergy not found",
                });
            }
            return res.status(200).json({
                acknowledgement: true,
                message: "Allergy deleted successfully",
            });
        } catch (error) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
