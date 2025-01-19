import { Request, Response, NextFunction } from "express";
import { medicalRecordService } from "../services/medicalRecordService";

export const medicalRecordController = {
    // Create a new medical record
    createMedicalRecord: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicalRecordService.createMedicalRecord(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get a medical record by ID
    getMedicalRecordById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicalRecordService.getMedicalRecordById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get all medical records by appointment ID
    getMedicalRecordsByAppointment: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicalRecordService.getMedicalRecordsByAppointment(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Update a medical record
    updateMedicalRecord: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicalRecordService.updateMedicalRecord(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Delete a medical record
    deleteMedicalRecord: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await medicalRecordService.deleteMedicalRecord(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
};
