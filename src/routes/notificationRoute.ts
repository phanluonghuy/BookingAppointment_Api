import express from "express";
import { notificationController } from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.post("/", notificationController.createNotification);
notificationRouter.get("/:id", notificationController.getNotificationById);
notificationRouter.get("/user/:userId", notificationController.getAllNotifications);
notificationRouter.patch("/:id", notificationController.updateNotificationStatus);
notificationRouter.delete("/:id", notificationController.deleteNotification);

export default notificationRouter;
