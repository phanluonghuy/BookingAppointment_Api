import { Request, Response } from "express";
import Prescription from "../models/prescriptionModel";
import MedicalRecord from "../models/medicalRecordModel";
import Dosage from "../models/dosageModel";
import mongoose from "mongoose";

export const prescriptionService = {
    // Create a new prescription
    createPrescription: async (req: Request, res: Response): Promise<Response> => {
        const { medicalRecordId, dosageDetails} = req.body;

        console.log(medicalRecordId, dosageDetails);

        if (!medicalRecordId || !dosageDetails || !Array.isArray(dosageDetails)) {
            return res.json({
                acknowledgement: false,
                message: "Medical record ID and dosage details are required",
            });
        }

        try {

            const existedPrescription = await Prescription.findOne({ medicalRecordId});

            if (existedPrescription) {
                const updatedPrescription = await Prescription.findOneAndUpdate(
                    { medicalRecordId },
                    { dosageDetails },
                    { new: true }
                );

                return res.json({
                    acknowledgement: true,
                    message: "Prescription updated successfully",
                    data: updatedPrescription,
                });
            }

            const prescription = new Prescription({
                medicalRecordId,
                dosageDetails,
            });

            await prescription.save();

            return res.json({
                acknowledgement: true,
                message: "Prescription created successfully",
                data: prescription,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error creating prescription",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    getPrescriptionByAppointmentId: async (req: Request, res: Response): Promise<Response> => {
        const { appointmentId } = req.params;

        try {
            const medicalRecord = await MedicalRecord.findOne({ appointmentId }).exec();
            if (!medicalRecord) {
                return res.json({
                    acknowledgement: false,
                    message: "Prescription not found",
                });
            }

            const prescriptions = await Prescription.find({ medicalRecordId: medicalRecord._id }).exec();
            if (!prescriptions) { 
                return res.json({
                    acknowledgement: false,
                    message: "Prescription not found",
                });
            }

            console.log(prescriptions[0].dosageDetails[0]);

            const dosage = await Dosage.findById(prescriptions[0].dosageDetails[0]).exec();

            return res.json({
                acknowledgement: true,
                message: "Prescription found",
                data: prescriptions,dosage
            });
        } catch (error) {
            console.error("Error fetching prescriptions:", error);
            throw error;
        }
        
    },

    // Get prescription by ID
    getPrescriptionById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const prescription = await Prescription.findById(id)
                .populate("medicalRecordId")
                .populate({
                    path: "dosageDetails",
                    populate: {
                        path: "medicineId",
                    },
                });

            if (!prescription) {
                return res.json({
                    acknowledgement: false,
                    message: "Prescription not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: prescription,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving prescription",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get all prescriptions
    getAllPrescriptions: async (_: Request, res: Response): Promise<Response> => {
        try {
            const prescriptions = await Prescription.find()
                .populate("medicalRecordId")
                .populate({
                    path: "dosageDetails",
                    populate: {
                        path: "medicineId",
                    },
                });

            return res.json({
                acknowledgement: true,
                data: prescriptions,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving prescriptions",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update a prescription
    updatePrescription: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { medicalRecordId, dosageDetails } = req.body;

        try {
            const prescription = await Prescription.findById(id);

            if (!prescription) {
                return res.json({
                    acknowledgement: false,
                    message: "Prescription not found",
                });
            }

            if (medicalRecordId) prescription.medicalRecordId = medicalRecordId;
            if (dosageDetails && Array.isArray(dosageDetails)) {
                prescription.dosageDetails = dosageDetails;
            }

            prescription.updatedAt = new Date();

            await prescription.save();

            return res.json({
                acknowledgement: true,
                message: "Prescription updated successfully",
                data: prescription,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error updating prescription",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete a prescription
    deletePrescription: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const prescription = await Prescription.findByIdAndDelete(id);

            if (!prescription) {
                return res.json({
                    acknowledgement: false,
                    message: "Prescription not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Prescription deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error deleting prescription",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
