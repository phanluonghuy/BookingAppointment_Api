import { Request, Response } from "express";
import HealthStatus from "../models/healthStatusModel";

export const healthStatusService = {
    // Create a new Health Status
    createHealthStatus: async (req: Request, res: Response): Promise<Response> => {
        const { patient, bloodPressure, heartRate, temperature, weight, notes } = req.body;

        if (!patient) {
            return res.json({
                acknowledgement: false,
                message: "Patient ID is required",
            });
        }

        try {
            const healthStatus = new HealthStatus({
                patient,
                bloodPressure,
                heartRate,
                temperature,
                weight,
                notes,
            });

            await healthStatus.save();

            return res.json({
                acknowledgement: true,
                message: "Health status created successfully",
                data: healthStatus,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error creating health status",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get a Health Status by ID
    getHealthStatusById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const healthStatus = await HealthStatus.findById(id); // .populate("patient");

            if (!healthStatus) {
                return res.json({
                    acknowledgement: false,
                    message: "Health status not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: healthStatus,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving health status",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all Health Statuses for a specific Patient
    getHealthStatusesByPatient: async (req: Request, res: Response): Promise<Response> => {
        const { patientId } = req.params;

        try {
            const healthStatuses = await HealthStatus.find({ patient: patientId });

            if (!healthStatuses || healthStatuses.length === 0) {
                return res.json({
                    acknowledgement: false,
                    message: "No health statuses found for this patient",
                });
            }

            return res.json({
                acknowledgement: true,
                data: healthStatuses,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving health statuses",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update a Health Status
    updateHealthStatus: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { bloodPressure, heartRate, temperature, weight, notes } = req.body;

        try {
            const healthStatus = await HealthStatus.findById(id);

            if (!healthStatus) {
                return res.json({
                    acknowledgement: false,
                    message: "Health status not found",
                });
            }

            if (bloodPressure !== undefined) healthStatus.bloodPressure = bloodPressure;
            if (heartRate !== undefined) healthStatus.heartRate = heartRate;
            if (temperature !== undefined) healthStatus.temperature = temperature;
            if (weight !== undefined) healthStatus.weight = weight;
            if (notes !== undefined) healthStatus.notes = notes;

            healthStatus.updatedAt = new Date();

            await healthStatus.save();

            return res.json({
                acknowledgement: true,
                message: "Health status updated successfully",
                data: healthStatus,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error updating health status",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete a Health Status
    deleteHealthStatus: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const deletedHealthStatus = await HealthStatus.findByIdAndDelete(id);

            if (!deletedHealthStatus) {
                return res.json({
                    acknowledgement: false,
                    message: "Health status not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Health status deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error deleting health status",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
