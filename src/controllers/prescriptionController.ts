import { Request, Response, NextFunction } from "express";
import { prescriptionService } from "../services/prescriptionService";

export const prescriptionController = {
    // Create a new prescription
    createPrescription: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await prescriptionService.createPrescription(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get prescription by ID
    getPrescriptionById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await prescriptionService.getPrescriptionById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    getPrescriptionByAppointmentId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await prescriptionService.getPrescriptionByAppointmentId(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get all prescriptions
    getAllPrescriptions: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await prescriptionService.getAllPrescriptions(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Update a prescription
    updatePrescription: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await prescriptionService.updatePrescription(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Delete a prescription
    deletePrescription: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await prescriptionService.deletePrescription(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
};
