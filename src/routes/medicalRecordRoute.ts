import express from "express";
import { medicalRecordController } from "../controllers/medicalRecordController";

const medicalRecordRouter = express.Router();

medicalRecordRouter.post("/", medicalRecordController.createMedicalRecord);
medicalRecordRouter.get("/:id", medicalRecordController.getMedicalRecordById);
medicalRecordRouter.get("/appointment/:appointmentId", medicalRecordController.getMedicalRecordsByAppointment);
medicalRecordRouter.put("/:id", medicalRecordController.updateMedicalRecord);
medicalRecordRouter.delete("/:id", medicalRecordController.deleteMedicalRecord);

export default medicalRecordRouter;
