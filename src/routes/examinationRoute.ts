import express from "express";
import { examinationController } from "../controllers/examinationController";

const examinationRouter = express.Router();

examinationRouter.post("/", examinationController.createExamination);
examinationRouter.get("/:id", examinationController.getExaminationById);
examinationRouter.get("/medical-record/:medicalRecordId", examinationController.getExaminationsByMedicalRecord);
examinationRouter.put("/:id", examinationController.updateExamination);
examinationRouter.delete("/:id", examinationController.deleteExamination);

export default examinationRouter;
