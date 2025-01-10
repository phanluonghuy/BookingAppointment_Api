import { Request, Response, NextFunction } from "express";
import { specializationService } from "../services/specializationService";

export const specializationController = {
    createSpecialization: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await specializationService.createSpecialization(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    getSpecializationsByDoctor: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await specializationService.getSpecializationsByDoctor(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    getSpecializationById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await specializationService.getSpecializationById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    updateSpecialization: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await specializationService.updateSpecialization(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    deleteSpecialization: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await specializationService.deleteSpecialization(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    deleteQualification: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await specializationService.deleteQualification(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },
};
