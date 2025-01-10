import express from "express";
import { workScheduleController } from "../controllers/workScheduleController";

const workScheduleRouter = express.Router();

workScheduleRouter.post("/", workScheduleController.createWorkSchedule);
workScheduleRouter.get("/:id", workScheduleController.getWorkScheduleById);
workScheduleRouter.get("/doctor/:doctorId", workScheduleController.getWorkScheduleByDoctor);
workScheduleRouter.put("/:id", workScheduleController.updateWorkSchedule);
workScheduleRouter.delete("/:id", workScheduleController.deleteWorkSchedule);
workScheduleRouter.delete("/:workScheduleId/time/:timeId", workScheduleController.deleteAvailableTime);

export default workScheduleRouter;
