import { Router } from "express";
import { paymentController } from "../controllers/paymentController";
import verify from "../middlewares/verifyMiddleware";

const paymentRouter = Router();

paymentRouter.post("/", verify, paymentController.createPayment);
paymentRouter.get("/:id", paymentController.getPaymentById);
paymentRouter.get("/patient/:patientId", paymentController.getPaymentsByPatient);
paymentRouter.get("/appointment/:appointmentId", paymentController.getPaymentsByAppointment);
paymentRouter.patch("/:id/method", paymentController.updatePaymentMethod);
paymentRouter.patch("/:id/status", paymentController.updatePaymentStatus);
paymentRouter.patch("/:id/refund", paymentController.updateRefundStatus);
paymentRouter.delete("/:id", paymentController.deletePayment);

export default paymentRouter;
