import { Request, Response, NextFunction } from "express";
import { examinationService } from "../services/examinationService";

export const examinationController = {
    // Create a new examination
    createExamination: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await examinationService.createExamination(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get an examination by ID
    getExaminationById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await examinationService.getExaminationById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get examinations by Medical Record ID
    getExaminationsByMedicalRecord: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await examinationService.getExaminationsByMedicalRecord(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Update an examination
    updateExamination: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await examinationService.updateExamination(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Delete an examination
    deleteExamination: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await examinationService.deleteExamination(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },
};
