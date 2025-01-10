import express from "express";
import { testResultController } from "../controllers/testResultController";
import upload from "../middlewares/uploadMiddleware";

const testResultRouter = express.Router();

testResultRouter.post("/", testResultController.createTestResult);
testResultRouter.post("/:id/upload", upload.single('result-file'), testResultController.uploadResultFile);
testResultRouter.get("/:id", testResultController.getTestResultById);
testResultRouter.get("/medical-record/:medicalRecordId", testResultController.getTestResultsByMedicalRecord);
testResultRouter.patch("/:id", upload.single('result-file'), testResultController.updateTestResult);
testResultRouter.delete("/:id", testResultController.deleteTestResult);

export default testResultRouter;
