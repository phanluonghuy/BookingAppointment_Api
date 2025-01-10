import { Request, Response } from "express";
import Insurance from "../models/insuranceModel";

export const insuranceService = {
    // Tạo mới một insurance
    createInsurance: async (req: Request, res: Response): Promise<Response> => {
        try {
            const {
                patientId,
                insuranceProvider,
                insuranceCardNumber,
                benefitLevel,
                livingAreaCode,
                initialHealthcareFacility,
                insuranceCardIssuingPlace,
                startDate,
                endDate,
            } = req.body;

            const newInsurance = await Insurance.create({
                patientId,
                insuranceProvider,
                insuranceCardNumber,
                benefitLevel,
                livingAreaCode,
                initialHealthcareFacility,
                insuranceCardIssuingPlace,
                startDate,
                endDate,
            });

            return res.json({
                acknowledgement: true,
                message: "Insurance created successfully",
                data: newInsurance,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error creating insurance",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Lấy danh sách insurance theo bệnh nhân
    getInsurancesByPatient: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId } = req.params;
            const insurances = await Insurance.find({ patientId }).sort({ createdAt: -1 });

            return res.json({
                acknowledgement: true,
                message: "Insurances fetched successfully",
                data: insurances,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error fetching insurances",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Lấy chi tiết insurance theo ID
    getInsuranceById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const insurance = await Insurance.findById(id);

            if (!insurance) {
                return res.json({
                    acknowledgement: false,
                    message: "Insurance not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Insurance fetched successfully",
                data: insurance,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error fetching insurance",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Cập nhật insurance theo ID
    updateInsurance: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatedInsurance = await Insurance.findByIdAndUpdate(
                id,
                { ...updates, updatedAt: new Date() },
                { new: true, runValidators: true }
            );

            if (!updatedInsurance) {
                return res.json({
                    acknowledgement: false,
                    message: "Insurance not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Insurance updated successfully",
                data: updatedInsurance,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error updating insurance",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Xóa insurance theo ID
    deleteInsurance: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const deletedInsurance = await Insurance.findByIdAndDelete(id);

            if (!deletedInsurance) {
                return res.json({
                    acknowledgement: false,
                    message: "Insurance not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Insurance deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error deleting insurance",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
