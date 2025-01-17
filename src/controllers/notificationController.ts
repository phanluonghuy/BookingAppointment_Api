import { Request, Response, NextFunction } from "express";
import { notificationService } from "../services/notificationService";

export const notificationController = {
    // Create a new notification
    createNotification: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await notificationService.createNotification(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get a notification by ID
    getNotificationById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await notificationService.getNotificationById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Get all notifications for a user
    getAllNotifications: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await notificationService.getAllNotifications(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Update notification status
    updateNotificationStatus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await notificationService.updateNotificationStatus(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Delete a notification
    deleteNotification: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await notificationService.deleteNotification(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
};
