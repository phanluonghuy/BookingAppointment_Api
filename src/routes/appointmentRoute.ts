import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController";

const appointmentRouter = Router();

appointmentRouter.post("/", appointmentController.createAppointment);
appointmentRouter.get("/:id", appointmentController.getAppointmentById);
appointmentRouter.get("/doctor/:doctorId", appointmentController.getAppointmentsByDoctor);
appointmentRouter.get("/patient/:patientId", appointmentController.getAppointmentsByPatient);
appointmentRouter.get("/doctor/:doctorId/date/:date", appointmentController.getAppointmentsByDoctorOnDate);
appointmentRouter.get("/patient/:patientId/date/:date", appointmentController.getAppointmentsByPatientOnDate);
appointmentRouter.patch("/:id/status", appointmentController.updateAppointmentStatus);
appointmentRouter.patch("/:id/priority", appointmentController.updateAppointmentPriority);
appointmentRouter.delete("/:id", appointmentController.deleteAppointment);
appointmentRouter.get("/doctor/:doctorId/today-stats", appointmentController.getTodayAppointmentStats);

export default appointmentRouter;
