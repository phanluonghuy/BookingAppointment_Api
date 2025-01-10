import { Request, Response } from "express";
import Notification from "../models/notificationModel";

export const notificationService = {
    // Create a new notification
    createNotification: async (req: Request, res: Response): Promise<Response> => {
        const { userId, prescriptionId, paymentId, appointmentId, notificationType, message } = req.body;

        if (!userId || !notificationType || !message) {
            return res.status(400).json({
                acknowledgement: false,
                message: "User ID, notification type, and message are required",
            });
        }

        try {
            const notification = new Notification({
                userId,
                prescriptionId,
                paymentId,
                appointmentId,
                notificationType,
                message,
            });

            await notification.save();

            return res.status(201).json({
                acknowledgement: true,
                message: "Notification created successfully",
                data: notification,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error creating notification",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get a notification by ID
    getNotificationById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const notification = await Notification.findById(id);
                // .populate("userId")
                // .populate("prescriptionId")
                // .populate("paymentId")
                // .populate("appointmentId");

            if (!notification) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Notification not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                data: notification,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving notification",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all notifications for a user
    getAllNotifications: async (req: Request, res: Response): Promise<Response> => {
        const { userId } = req.params;

        try {
            const notifications = await Notification.find({ userId });
                // .populate("prescriptionId")
                // .populate("paymentId")
                // .populate("appointmentId");

            return res.status(200).json({
                acknowledgement: true,
                data: notifications,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving notifications",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update notification status
    updateNotificationStatus: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !["unread", "read"].includes(status)) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Status must be either 'unread' or 'read'",
            });
        }

        try {
            const notification = await Notification.findById(id);

            if (!notification) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Notification not found",
                });
            }

            notification.status = status;
            notification.updatedAt = new Date();

            await notification.save();

            return res.status(200).json({
                acknowledgement: true,
                message: "Notification status updated successfully",
                data: notification,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error updating notification status",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete a notification
    deleteNotification: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const notification = await Notification.findByIdAndDelete(id);

            if (!notification) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Notification not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                message: "Notification deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error deleting notification",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
