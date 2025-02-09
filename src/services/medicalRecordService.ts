import { Request, Response } from "express";
import MedicalRecord from "../models/medicalRecordModel";
import { ObjectId } from "mongodb";
import TestResult from "../models/testResultModel";
import Prescription from "../models/prescriptionModel";
import Dosage from "../models/dosageModel";

export const medicalRecordService = {
  // Create a new medical record
  createMedicalRecord: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { appointmentId, diagnosis, notes } = req.body;

      if (!appointmentId || !diagnosis) {
        return res.json({
          acknowledgement: false,
          message: "Appointment ID, diagnosis, and symptoms are required",
        });
      }

      const existingMedicalRecord = await MedicalRecord.findOne({
        appointmentId,
      });

      if (existingMedicalRecord) {
        const updatedMedicalRecord = await MedicalRecord.findOneAndUpdate(
          { appointmentId },
          { diagnosis, notes },
          { new: true }
        );
        return res.json({
          acknowledgement: true,
          message: "Medical record updated successfully",
          data: updatedMedicalRecord,
        });
      }

      const medicalRecord = new MedicalRecord({
        appointmentId,
        diagnosis,
        notes,
      });

      await medicalRecord.save();

      return res.json({
        acknowledgement: true,
        message: "Medical record created successfully",
        data: medicalRecord,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error creating medical record",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Get medical record by ID
  getMedicalRecordById: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;

      const medicalRecord = await MedicalRecord.findOne({
        appointmentId: new ObjectId(id),
      }); // .populate("appointmentId");
      if (!medicalRecord) {
        return res.json({
          acknowledgement: false,
          message: "Medical record not found",
        });
      }

      const testResult = await TestResult.findOne({
        medicalRecordId: medicalRecord._id,
      });

      if (!testResult) {
        return res.json({
          acknowledgement: false,
          message: "Test record not found",
        });
      }

      return res.json({
        acknowledgement: true,
        data: {
          medicalRecord,
          testResult,
        },
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error retrieving medical record",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Get all medical records by appointment ID
  getMedicalRecordsByAppointment: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { appointmentId } = req.params;

      const medicalRecords = await MedicalRecord.find({ appointmentId }); // .populate("appointmentId");

      if (!medicalRecords || medicalRecords.length === 0) {
        return res.json({
          acknowledgement: false,
          message: "No medical records found for this appointment",
        });
      }

      try {
        const prescription = await Prescription.findOne({
          medicalRecordId: medicalRecords[0]._id,
        });

        const dosage = await Dosage.findById(prescription?.dosageDetails[0]);
        return res.json({
          acknowledgement: true,
          message: "Prescription found2",
        //   data: medicalRecords[0],prescription,dosage,
        data: {medicalRecords, prescription, dosage}
        });
      } catch (error) {}

      return res.json({
        acknowledgement: true,
        data: medicalRecords[0],
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error retrieving medical records",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Update a medical record
  updateMedicalRecord: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const { diagnosis, notes } = req.body;

      const medicalRecord = await MedicalRecord.findById(id);

      if (!medicalRecord) {
        return res.json({
          acknowledgement: false,
          message: "Medical record not found",
        });
      }

      if (diagnosis) medicalRecord.diagnosis = diagnosis;
      if (notes) medicalRecord.notes = notes;
      medicalRecord.updatedAt = new Date();

      await medicalRecord.save();

      return res.json({
        acknowledgement: true,
        message: "Medical record updated successfully",
        data: medicalRecord,
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error updating medical record",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },

  // Delete a medical record
  deleteMedicalRecord: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;

      const deletedMedicalRecord = await MedicalRecord.findByIdAndDelete(id);

      if (!deletedMedicalRecord) {
        return res.json({
          acknowledgement: false,
          message: "Medical record not found",
        });
      }

      return res.json({
        acknowledgement: true,
        message: "Medical record deleted successfully",
      });
    } catch (error) {
      return res.json({
        acknowledgement: false,
        message: "Error deleting medical record",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
};
