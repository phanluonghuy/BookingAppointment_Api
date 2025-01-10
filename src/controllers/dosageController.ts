import { Request, Response, NextFunction } from "express";
import { dosageService } from "../services/dosageService";

export const dosageController = {
    // Create a new dosage
    createDosage: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await dosageService.createDosage(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get dosage by ID
    getDosageById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await dosageService.getDosageById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get all dosages
    getAllDosages: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await dosageService.getAllDosages(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Update a dosage
    updateDosage: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await dosageService.updateDosage(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Delete a dosage
    deleteDosage: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await dosageService.deleteDosage(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },
};
