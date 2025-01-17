import { Request, Response, NextFunction } from "express";
import { paymentService } from "../services/paymentService";

export const paymentController = {
    // Create a new payment
    createPayment: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.createPayment(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get payment by ID
    getPaymentById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.getPaymentById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get payments by patient ID
    getPaymentsByPatient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.getPaymentsByPatient(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get payments by appointment ID
    getPaymentsByAppointment: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.getPaymentsByAppointment(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Update payment method
    updatePaymentMethod: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.updatePaymentMethod(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Update payment status
    updatePaymentStatus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.updatePaymentStatus(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Update refund status
    updateRefundStatus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.updateRefundStatus(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Delete payment
    deletePayment: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await paymentService.deletePayment(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
};
