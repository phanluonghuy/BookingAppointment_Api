import { Request, Response } from "express";
import Notification from "../models/notificationModel";
import Appointment from "../models/appointmentModel";
import mongoose from "mongoose";

export const notificationService = {
  // Create a new notification
  createNotification: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const {
      userId,
      prescriptionId,
      paymentId,
      appointmentId,
      notificationType,
      message,
    } = req.body;

    if (!userId || !notificationType || !message) {
      return res.json({
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

      return res.json({
        acknowledgement: true,
        message: "Notification created successfully",
        data: notification,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error creating notification",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Get a notification by ID
  getNotificationById: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    try {
      const notification = await Notification.findById(id);
      // .populate("userId")
      // .populate("prescriptionId")
      // .populate("paymentId")
      // .populate("appointmentId");

      if (!notification) {
        return res.json({
          acknowledgement: false,
          message: "Notification not found",
        });
      }

      return res.json({
        acknowledgement: true,
        data: notification,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error retrieving notification",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Get all notifications for a user
  getAllNotifications: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { userId } = req.params;

    // try {
    //     const notifications = await Notification.find({ userId });
    //         // .populate("prescriptionId")
    //         // .populate("paymentId")
    //         // .populate("appointmentId");

    //     return res.json({
    //         acknowledgement: true,
    //         data: notifications,
    //     });
    // } catch (error) {
    //     return res.json({
    //         acknowledgement: false,
    //         message: "Error retrieving notifications",
    //         description: error instanceof Error ? error.message : "An unknown error occurred",
    //     });
    // }

    const rs = await Appointment.aggregate([
        {
          $match: { patientId: new mongoose.Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: "medicalrecords",
            localField: "_id",
            foreignField: "appointmentId",
            as: "medicalRecord",
          },
        },
        { $unwind: "$medicalRecord" },
        {
          $lookup: {
            from: "prescriptions",
            localField: "medicalRecord._id",
            foreignField: "medicalRecordId",
            as: "prescription",
          },
        },
        { $unwind: "$prescription" },
        {
          $unwind: "$prescription.dosageDetails", // Tách từng phần tử trong dosageDetails
        },
        {
          $lookup: {
            from: "dosages",
            localField: "prescription.dosageDetails",
            foreignField: "_id",
            as: "dosage",
          },
        },
        { $unwind: "$dosage" },
        {
          $lookup: {
            from: "medicines", // Nối bảng medicines để lấy tên thuốc
            localField: "dosage.medicineId",
            foreignField: "_id",
            as: "medicineInfo",
          },
        },
        { $unwind: "$medicineInfo" }, // Tách thông tin thuốc ra
        {
          $project: {
            _id: 0,
            userId: 1,
            medicineId: "$dosage.medicineId",
            medicineName: "$medicineInfo.name", // Lấy tên thuốc
            times: "$dosage.times.time",
            amountPerDose: "$dosage.amountPerDose",
            duration: "$dosage.duration",
            status: "$dosage.status",
            startDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$appointmentDate" },
            },
          },
        },
        { $match: { status: "active" } },
      ]);
      

    return res.json({
      acknowledgement: true,
      message: "Notifications retrieved successfully",
      data: rs,
    });
  },

  // Update notification status
  updateNotificationStatus: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["unread", "read"].includes(status)) {
      return res.json({
        acknowledgement: false,
        message: "Status must be either 'unread' or 'read'",
      });
    }

    try {
      const notification = await Notification.findById(id);

      if (!notification) {
        return res.json({
          acknowledgement: false,
          message: "Notification not found",
        });
      }

      notification.status = status;
      notification.updatedAt = new Date();

      await notification.save();

      return res.json({
        acknowledgement: true,
        message: "Notification status updated successfully",
        data: notification,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error updating notification status",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Delete a notification
  deleteNotification: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    try {
      const notification = await Notification.findByIdAndDelete(id);

      if (!notification) {
        return res.json({
          acknowledgement: false,
          message: "Notification not found",
        });
      }

      return res.json({
        acknowledgement: true,
        message: "Notification deleted successfully",
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error deleting notification",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
};
