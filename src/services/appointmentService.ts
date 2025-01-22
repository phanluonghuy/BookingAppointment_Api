import { Request, Response } from "express";
// import redisUtil from "../utils/redisUtil";
import Appointment from "../models/appointmentModel";
import { verifyandget_id } from "../utils/tokenUtil";
import mongoose from "mongoose";

// const getTotalServeKey = (doctorId: string) => `appointments:today:${doctorId}:totalServe`;
// const getCompletedKey = (doctorId: string) => `appointments:today:${doctorId}:completed`;

const updateRedisForTodayAppointments = async (doctorId: string): Promise<any> => {
    const dateStr = new Date().toISOString().split("T")[0];
    const dateStartUTC = new Date(`${dateStr}T00:00:00Z`);
    const dateEndUTC = new Date(`${dateStr}T23:59:59.999Z`);
};

//     const totalServe = appointments.filter(a => a.status !== "pending").length;
//     const completed = appointments.filter(a => ["completed", "cancelled"].includes(a.status)).length;

export const appointmentService = {
  // Create a new appointment
  createAppointment: async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const patientId = verifyandget_id(token as string);

      const { doctorId, appointmentDate, symptoms, notes } = req.body;

      // console.log(patientId,doctorId, appointmentDate, symptoms, notes);

      if (!patientId || !doctorId || !appointmentDate || !symptoms) {
        return res.json({
          acknowledgement: false,
          message:
            "Patient ID, Doctor ID, Appointment Date, and Symptoms are required",
        });
      }

      const dateStr = new Date(appointmentDate).toISOString().split("T")[0];

      const dateStartUTC = new Date(`${dateStr}T00:00:00Z`);
      const dateEndUTC = new Date(`${dateStr}T23:59:59.999Z`);

      console.log(dateStartUTC);
      console.log(dateEndUTC);

      const existingAppointments = await Appointment.find({
        doctorId,
        appointmentDate: { $gte: dateStartUTC, $lte: dateEndUTC },
      });

      const queueNumber = existingAppointments.length + 1;

      const appointment = new Appointment({
        patientId,
        doctorId,
        appointmentDate,
        symptoms,
        notes,
        queueNumber,
      });

      await appointment.save();

      return res.json({
        acknowledgement: true,
        message: "Appointment created successfully",
        data: appointment,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Get appointment by ID
  getAppointmentById: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;

      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.json({
          acknowledgement: false,
          message: "Appointment not found",
        });
      }

      return res.json({
        acknowledgement: true,
        data: appointment,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Get all appointments by doctor
  getAppointmentsByDoctor: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { doctorId } = req.params;

      const appointments = await Appointment.aggregate([
        {
          $match: {
            doctorId:  new mongoose.Types.ObjectId(doctorId), // Ensure this matches the field name and data type
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "patientId",
            foreignField: "_id",
            as: "doctorDetails",
          },
        },
        {
          $unwind: "$doctorDetails",
        },
        {
          $project: {
            symptoms: 1,
            createdAt: 1,
            patientId: 1,
            doctorId: 1,
            __v: 1,
            queueNumber: 1,
            _id: 1,
            priority: 1,
            appointmentDate: 1,
            status: 1,
            updatedAt: 1,
            doctorName: "$doctorDetails.name", // Project doctor name as a top-level field
            doctorAvatarUrl: "$doctorDetails.avatar.url", // Project doctor avatar URL as a top-level field
          },
        },
      ]);

      if (!appointments || appointments.length === 0) {
        return res.json({
          acknowledgement: false,
          message: "No appointments found for this doctor",
        });
      }

      return res.json({
        acknowledgement: true,
        data: appointments,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
  getNearestAppointment: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const patientId = verifyandget_id(token as string); // Replace with your token verification logic

      const appointments = await Appointment.aggregate([
        {
          $match: {
            patientId:  new mongoose.Types.ObjectId(patientId), // Ensure this matches the field name and data type
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctorDetails",
          },
        },
        {
          $unwind: "$doctorDetails",
        },
        {
          $match: {
            patientId: new mongoose.Types.ObjectId(patientId), // Filter appointments for the specific patient
            appointmentDate: { $gte: new Date() }, // Filter appointments in the future or now
          },
        },
        {
          $sort: { appointmentDate: 1 }, // Sort by the nearest appointment date
        },
        {
          $project: {
            symptoms: 1,
            createdAt: 1,
            patientId: 1,
            doctorId: 1,
            __v: 1,
            queueNumber: 1,
            _id: 1,
            priority: 1,
            appointmentDate: 1,
            status: 1,
            updatedAt: 1,
            doctorName: "$doctorDetails.name",
            doctorAvatarUrl: "$doctorDetails.avatar.url",
          },
        },
        { $limit: 1 }, // Only get the nearest appointment
      ]);

      if (!appointments || appointments.length === 0) {
        return res.json({
          acknowledgement: false,
          message: "No upcoming appointments found for this patient",
        });
      }

      return res.json({
        acknowledgement: true,
        data: appointments[0], // Return the nearest appointment
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
  // Get all appointments by patient
  getAppointmentsByPatient: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { patientId } = req.params;

      // const appointments = await Appointment.find({ patientId });
      const appointments = await Appointment.aggregate([
        {
          $match: {
            patientId:  new mongoose.Types.ObjectId(patientId), // Ensure this matches the field name and data type
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctorDetails",
          },
        },
        {
          $unwind: "$doctorDetails",
        },
        {
          $project: {
            symptoms: 1,
            createdAt: 1,
            patientId: 1,
            doctorId: 1,
            __v: 1,
            queueNumber: 1,
            _id: 1,
            priority: 1,
            appointmentDate: 1,
            status: 1,
            updatedAt: 1,
            doctorName: "$doctorDetails.name", // Project doctor name as a top-level field
            doctorAvatarUrl: "$doctorDetails.avatar.url", // Project doctor avatar URL as a top-level field
          },
        },
      ]);

      if (!appointments || appointments.length === 0) {
        return res.json({
          acknowledgement: false,
          message: "No appointments found for this patient",
        });
      }

      return res.json({
        acknowledgement: true,
        data: appointments,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
  // Get appointments by doctor on a specific date
  getAppointmentsByDoctorOnDate: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { doctorId, date } = req.params;

      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      const appointments = await Appointment.find({
        doctorId,
        appointmentDate: { $gte: dateStart, $lte: dateEnd },
      });

      if (!appointments || appointments.length === 0) {
        return res.json({
          acknowledgement: false,
          message: "No appointments found for this doctor on this date",
        });
      }

      return res.json({
        acknowledgement: true,
        data: appointments,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Get appointments by patient on a specific date
  getAppointmentsByPatientOnDate: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { patientId, date } = req.params;

      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0); // Start of the day
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999); // End of the day

      const appointments = await Appointment.find({
        patientId,
        appointmentDate: { $gte: dateStart, $lte: dateEnd },
      });

      if (!appointments || appointments.length === 0) {
        return res.json({
          acknowledgement: false,
          message: "No appointments found for this patient on this date",
        });
      }

      return res.json({
        acknowledgement: true,
        data: appointments,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Update appointment status
  // updateAppointmentStatus: async (req: Request, res: Response): Promise<Response> => {
  //     try {
  //         const { id } = req.params;
  //         const { status } = req.body;

  //         if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
  //             return res.json({
  //                 acknowledgement: false,
  //                 message: "Status is required and must be one of 'pending', 'confirmed', 'completed', or 'cancelled'",
  //             });
  //         }

  //         const appointment = await Appointment.findById(id);

  //         if (!appointment) {
  //             return res.json({
  //                 acknowledgement: false,
  //                 message: "Appointment not found",
  //             });
  //         }

  //         const originalStatus = appointment.status;
  //         const doctorId = appointment.doctorId.toString();
  //         appointment.status = status;
  //         appointment.updatedAt = new Date();
  //         await appointment.save();

  //         const today = new Date().toISOString().split("T")[0];
  //         const appointmentDate = new Date(appointment.appointmentDate).toISOString().split("T")[0];

  //         if (appointmentDate === today && originalStatus !== status) {
  //             await updateRedisForTodayAppointments(doctorId);
  //         }

  //         return res.json({
  //             acknowledgement: true,
  //             message: "Appointment status updated successfully",
  //             data: appointment,
  //         });
  //     } catch (error) {
  //         return res.json({
  //             acknowledgement: false,
  //             message: "Error",
  //             description: error instanceof Error ? error.message : "An unknown error occurred",
  //         });
  //     }
  // },

  // Update appointment priority
  updateAppointmentPriority: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const { priority } = req.body;

      if (!priority || !["low", "medium", "high"].includes(priority)) {
        return res.json({
          acknowledgement: false,
          message:
            "Priority is required and must be one of 'low', 'medium', or 'high'",
        });
      }

      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return res.json({
          acknowledgement: false,
          message: "Appointment not found",
        });
      }

      appointment.priority = priority;
      appointment.updatedAt = new Date();

      await appointment.save();

      return res.json({
        acknowledgement: true,
        message: "Appointment priority updated successfully",
        data: appointment,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Delete an appointment
  deleteAppointment: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const deletedAppointment = await Appointment.findByIdAndDelete(id);

      if (!deletedAppointment) {
        return res.json({
          acknowledgement: false,
          message: "Appointment not found",
        });
      }

      return res.json({
        acknowledgement: true,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // getTodayAppointmentStats: async (req: Request, res: Response): Promise<Response> => {
  //     const { doctorId } = req.params;

  //     try {
  //         const totalServe = await redisUtil.getFromRedis(getTotalServeKey(doctorId));
  //         const completed = await redisUtil.getFromRedis(getCompletedKey(doctorId));

  //         if (totalServe && completed) {
  //             return res.json({
  //                 acknowledgement: true,
  //                 data: {
  //                     totalServe: Number(totalServe),
  //                     completed: Number(completed),
  //                 },
  //             });
  //         }

  //         await updateRedisForTodayAppointments(doctorId);

  //         const newTotalServe = await redisUtil.getFromRedis(getTotalServeKey(doctorId));
  //         const newCompleted = await redisUtil.getFromRedis(getCompletedKey(doctorId));

  //         return res.json({
  //             acknowledgement: true,
  //             data: {
  //                 totalServe: Number(newTotalServe),
  //                 completed: Number(newCompleted),
  //             },
  //         });
  //     } catch (error) {
  //         return res.json({
  //             acknowledgement: false,
  //             message: "Error",
  //             description: error instanceof Error ? error.message : "An unknown error occurred",
  //         });
  //     }
  // },
}