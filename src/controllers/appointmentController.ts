import { Request, Response, NextFunction } from "express";
import { appointmentService } from "../services/appointmentService";

export const appointmentController = {
    // Create a new appointment
    createAppointment: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.createAppointment(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get appointment by ID
    getAppointmentById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.getAppointmentById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get all appointments by doctor
    getAppointmentsByDoctor: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.getAppointmentsByDoctor(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get all appointments by patient
    getAppointmentsByPatient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.getAppointmentsByPatient(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get appointments by doctor on a specific date
    getAppointmentsByDoctorOnDate: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.getAppointmentsByDoctorOnDate(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Get appointments by patient on a specific date
    getAppointmentsByPatientOnDate: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.getAppointmentsByPatientOnDate(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Update appointment status
    updateAppointmentStatus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // await appointmentService.updateAppointmentStatus(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Update appointment priority
    updateAppointmentPriority: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.updateAppointmentPriority(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Delete an appointment
    deleteAppointment: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await appointmentService.deleteAppointment(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },

    // Today Appointment Stats
    getTodayAppointmentStats: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // await appointmentService.getTodayAppointmentStats(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.url} || Method: ${req.method}`);
        }
    },
};
