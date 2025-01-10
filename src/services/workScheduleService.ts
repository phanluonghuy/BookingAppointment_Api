import { Request, Response } from "express";
import WorkSchedule from "../models/workScheduleModel";

export const workScheduleService = {
    createWorkSchedule: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { doctorId, availableTimes } = req.body;

            if (!doctorId) {
                return res.json({
                    acknowledgement: false,
                    message: "Doctor ID is required",
                });
            }

            if (!availableTimes) {
                return res.json({
                    acknowledgement: false,
                    message: "Available times are required",
                });
            }

            if (!Array.isArray(availableTimes)) {
                return res.json({
                    acknowledgement: false,
                    message: "Available times must be an array",
                });
            }

            const workSchedule = new WorkSchedule({
                doctorId,
                availableTimes,
            });

            await workSchedule.save();

            return res.json({
                acknowledgement: true,
                message: "Work schedule created successfully",
                data: workSchedule,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    getWorkScheduleById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const workSchedule = await WorkSchedule.findById(id);

            if (!workSchedule) {
                return res.json({
                    acknowledgement: false,
                    message: "Work schedule not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: workSchedule,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    getWorkScheduleByDoctor: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { doctorId } = req.params;

            const workSchedule = await WorkSchedule.findOne({ doctorId });

            if (!workSchedule) {
                return res.json({
                    acknowledgement: false,
                    message: "Work schedule not found for this doctor",
                });
            }

            return res.json({
                acknowledgement: true,
                data: workSchedule,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    updateWorkSchedule: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { availableTimes } = req.body;

            if (availableTimes && !Array.isArray(availableTimes)) {
                return res.json({
                    acknowledgement: false,
                    message: "Available times must be an array",
                });
            }

            const workSchedule = await WorkSchedule.findById(id);

            if (!workSchedule) {
                return res.json({
                    acknowledgement: false,
                    message: "Work schedule not found",
                });
            }

            if (availableTimes) {
                workSchedule.availableTimes = availableTimes;
            }

            workSchedule.updatedAt = new Date();

            await workSchedule.save();

            return res.json({
                acknowledgement: true,
                message: "Work schedule updated successfully",
                data: workSchedule,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    deleteWorkSchedule: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const deletedWorkSchedule = await WorkSchedule.findByIdAndDelete(id);

            if (!deletedWorkSchedule) {
                return res.json({
                    acknowledgement: false,
                    message: "Work schedule not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Work schedule deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    deleteAvailableTime: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { workScheduleId, timeId } = req.params;

            const workSchedule = await WorkSchedule.findByIdAndUpdate(
                workScheduleId,
                {
                    $pull: { availableTimes: { _id: timeId } },
                },
                { new: true }
            );

            if (!workSchedule) {
                return res.json({
                    acknowledgement: false,
                    message: "Work schedule not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Available time removed successfully",
                data: workSchedule,
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
