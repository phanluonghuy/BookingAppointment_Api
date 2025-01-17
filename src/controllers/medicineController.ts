import { Request, Response, NextFunction } from "express";
import { medicineService } from "../services/medicineService";

export const medicineController = {
    // Create a new medicine
    createMedicine: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicineService.createMedicine(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Get a medicine by ID
    getMedicineById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicineService.getMedicineById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Get all medicines
    getAllMedicines: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicineService.getAllMedicines(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Update a medicine
    updateMedicine: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicineService.updateMedicine(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Delete a medicine
    deleteMedicine: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicineService.deleteMedicine(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },
};
