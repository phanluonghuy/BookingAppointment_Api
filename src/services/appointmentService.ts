import { Request, Response } from "express";
import Appointment from "../models/appointmentModel";

export const appointmentService = {
    // Create a new appointment
    createAppointment: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId, doctorId, appointmentDate, symptoms, notes} = req.body;

            if (!patientId || !doctorId || !appointmentDate || !symptoms) {
                return res.json({
                    acknowledgement: false,
                    message: "Patient ID, Doctor ID, Appointment Date, and Symptoms are required",
                });
            }

            // Calculate the queue number for the appointment on the same day
            const dateStart = new Date(appointmentDate);
            dateStart.setHours(0, 0, 0, 0); // Start of the day
            const dateEnd = new Date(appointmentDate);
            dateEnd.setHours(23, 59, 59, 999); // End of the day

            // Find appointments for the same doctor and date
            const existingAppointments = await Appointment.find({
                doctorId,
                appointmentDate: { $gte: dateStart, $lte: dateEnd },
            });

            // Determine the queue number (based on existing appointments)
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
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get appointment by ID
    getAppointmentById: async (req: Request, res: Response): Promise<Response> => {
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
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all appointments by doctor
    getAppointmentsByDoctor: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { doctorId } = req.params;

            const appointments = await Appointment.find({ doctorId });

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
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all appointments by patient
    getAppointmentsByPatient: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId } = req.params;

            const appointments = await Appointment.find({ patientId });

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
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get appointments by doctor on a specific date
    getAppointmentsByDoctorOnDate: async (req: Request, res: Response): Promise<Response> => {
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
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get appointments by patient on a specific date
    getAppointmentsByPatientOnDate: async (req: Request, res: Response): Promise<Response> => {
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
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update appointment status
    updateAppointmentStatus: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
                return res.json({
                    acknowledgement: false,
                    message: "Status is required and must be one of 'pending', 'confirmed', 'completed', or 'cancelled'",
                });
            }

            const appointment = await Appointment.findById(id);

            if (!appointment) {
                return res.json({
                    acknowledgement: false,
                    message: "Appointment not found",
                });
            }

            appointment.status = status;
            appointment.updatedAt = new Date();

            await appointment.save();

            return res.json({
                acknowledgement: true,
                message: "Appointment status updated successfully",
                data: appointment,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update appointment priority
    updateAppointmentPriority: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { priority } = req.body;

            if (!priority || !["low", "medium", "high"].includes(priority)) {
                return res.json({
                    acknowledgement: false,
                    message: "Priority is required and must be one of 'low', 'medium', or 'high'",
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
                description: error instanceof Error ? error.message : "An unknown error occurred",
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
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
