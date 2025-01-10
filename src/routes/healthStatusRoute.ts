import express from "express";
import { healthStatusController } from "../controllers/healthStatusController";

const healthStatusRouter = express.Router();

healthStatusRouter.post("/", healthStatusController.createHealthStatus);
healthStatusRouter.get("/:id", healthStatusController.getHealthStatusById);
healthStatusRouter.get("/patient/:patientId", healthStatusController.getHealthStatusesByPatient);
healthStatusRouter.patch("/:id", healthStatusController.updateHealthStatus);
healthStatusRouter.delete("/:id", healthStatusController.deleteHealthStatus);

export default healthStatusRouter;
