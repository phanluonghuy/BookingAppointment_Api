import { Request, Response, NextFunction } from "express";
import { healthStatusService } from "../services/healthStatusService";

export const healthStatusController = {
    // Create a new Health Status
    createHealthStatus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await healthStatusService.createHealthStatus(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Get a Health Status by ID
    getHealthStatusById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await healthStatusService.getHealthStatusById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Get all Health Statuses for a specific Patient
    getHealthStatusesByPatient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await healthStatusService.getHealthStatusesByPatient(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Update a Health Status
    updateHealthStatus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await healthStatusService.updateHealthStatus(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Delete a Health Status
    deleteHealthStatus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await healthStatusService.deleteHealthStatus(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },
};
