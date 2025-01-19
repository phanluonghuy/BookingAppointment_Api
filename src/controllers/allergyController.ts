import { Request, Response, NextFunction } from "express";
import { allergyService } from "../services/allergyService";

export const allergyController = {
    createAllergy: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await allergyService.createAllergy(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    getAllergiesByPatient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await allergyService.getAllergiesByPatient(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    getAllergyById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await allergyService.getAllergyById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    updateAllergy: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await allergyService.updateAllergy(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    deleteAllergy: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await allergyService.deleteAllergy(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
};
