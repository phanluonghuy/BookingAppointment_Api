import { Router } from "express";
import { insuranceController } from "../controllers/insuranceController";

const insuranceRouter = Router();

insuranceRouter.post("/", insuranceController.createInsurance);
insuranceRouter.get("/patient/:patientId", insuranceController.getInsurancesByPatient);
insuranceRouter.get("/:id", insuranceController.getInsuranceById);
insuranceRouter.put("/:id", insuranceController.updateInsurance);
insuranceRouter.delete("/:id", insuranceController.deleteInsurance);

export default insuranceRouter;
