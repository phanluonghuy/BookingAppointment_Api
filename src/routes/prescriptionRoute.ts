import express from "express";
import { prescriptionController } from "../controllers/prescriptionController";

const prescriptionRouter = express.Router();

prescriptionRouter.post("/", prescriptionController.createPrescription);
prescriptionRouter.get("/:id", prescriptionController.getPrescriptionById);
prescriptionRouter.get("/", prescriptionController.getAllPrescriptions);
prescriptionRouter.get("/appointment/:appointmentId", prescriptionController.getPrescriptionByAppointmentId);
prescriptionRouter.patch("/:id", prescriptionController.updatePrescription);
prescriptionRouter.delete("/:id", prescriptionController.deletePrescription);

export default prescriptionRouter;
