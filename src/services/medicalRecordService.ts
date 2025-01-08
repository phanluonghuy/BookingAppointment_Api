import { Request, Response } from "express";
import MedicalRecord from '../models/medicalRecordModel'

export const medicalRecordService = {
    // Create a new medical record
    createMedicalRecord: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { appointmentId, diagnosis, symptoms, notes } = req.body;

            if (!appointmentId || !diagnosis || !symptoms) {
                return res.status(400).json({
                    acknowledgement: false,
                    message: "Appointment ID, diagnosis, and symptoms are required",
                });
            }

            const medicalRecord = new MedicalRecord({
                appointmentId,
                diagnosis,
                symptoms,
                notes,
            });

            await medicalRecord.save();

            return res.status(201).json({
                acknowledgement: true,
                message: "Medical record created successfully",
                data: medicalRecord,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error creating medical record",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get medical record by ID
    getMedicalRecordById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const medicalRecord = await MedicalRecord.findById(id); // .populate("appointmentId");

            if (!medicalRecord) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Medical record not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                data: medicalRecord,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving medical record",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all medical records by appointment ID
    getMedicalRecordsByAppointment: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { appointmentId } = req.params;

            const medicalRecords = await MedicalRecord.find({ appointmentId }); // .populate("appointmentId");

            if (!medicalRecords || medicalRecords.length === 0) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "No medical records found for this appointment",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                data: medicalRecords,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving medical records",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update a medical record
    updateMedicalRecord: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { diagnosis, symptoms, notes } = req.body;

            const medicalRecord = await MedicalRecord.findById(id);

            if (!medicalRecord) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Medical record not found",
                });
            }

            if (diagnosis) medicalRecord.diagnosis = diagnosis;
            if (symptoms) medicalRecord.symptoms = symptoms;
            if (notes) medicalRecord.notes = notes;
            medicalRecord.updatedAt = new Date();

            await medicalRecord.save();

            return res.status(200).json({
                acknowledgement: true,
                message: "Medical record updated successfully",
                data: medicalRecord,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error updating medical record",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete a medical record
    deleteMedicalRecord: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const deletedMedicalRecord = await MedicalRecord.findByIdAndDelete(id);

            if (!deletedMedicalRecord) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Medical record not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                message: "Medical record deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error deleting medical record",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
