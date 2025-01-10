import { Request, Response } from "express";
import Specialization from "../models/specializationModel";
import Qualification from "../models/qualificationModel";

export const specializationService = {
    // Tạo mới một specialization
    createSpecialization: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { doctorId, specializations, qualifications, experienceYears } = req.body;
            const newSpecialization = await Specialization.create({
                doctorId,
                specializations,
                qualifications,
                experienceYears,
            });

            return res.json({
                acknowledgement: true,
                message: "Specialization created successfully",
                data: newSpecialization,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Lấy danh sách specialization theo bác sĩ
    getSpecializationsByDoctor: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { doctorId } = req.params;
            const specializations = await Specialization.find({ doctorId }).sort({ createdAt: -1 });
            return res.json({
                acknowledgement: true,
                message: "Specializations fetched successfully",
                data: specializations,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Lấy chi tiết specialization theo ID
    getSpecializationById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const specialization = await Specialization.findById(id);
            if (!specialization) {
                return res.json({
                    acknowledgement: false,
                    message: "Specialization not found",
                });
            }
            return res.json({
                acknowledgement: true,
                message: "Specialization fetched successfully",
                data: specialization,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Cập nhật specialization theo ID
    updateSpecialization: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedSpecialization = await Specialization.findByIdAndUpdate(
                id,
                { ...updates, updatedAt: new Date() },
                { new: true, runValidators: true }
            );
            if (!updatedSpecialization) {
                return res.json({
                    acknowledgement: false,
                    message: "Specialization not found",
                });
            }
            return res.json({
                acknowledgement: true,
                message: "Specialization updated successfully",
                data: updatedSpecialization,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Xóa specialization theo ID
    deleteSpecialization: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const deletedSpecialization = await Specialization.findByIdAndDelete(id);
            if (!deletedSpecialization) {
                return res.json({
                    acknowledgement: false,
                    message: "Specialization not found",
                });
            }
            return res.json({
                acknowledgement: true,
                message: "Specialization deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    deleteQualification: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { specializationId, qualificationId } = req.params;

            const updatedSpecialization = await Specialization.findOneAndUpdate(
                { _id: specializationId },
                { $pull: { qualifications: { _id: qualificationId } } }, // Remove qualification by its _id
                { new: true }
            );

            if (!updatedSpecialization) {
                return res.json({
                    acknowledgement: false,
                    message: "Specialization not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Qualification deleted successfully",
                data: updatedSpecialization,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
