import express from "express";
import { conversationController } from "../controllers/conversationController";
import upload from "../middlewares/uploadMiddleware";

const conversationRouter = express.Router();

conversationRouter.post("/", conversationController.createConversation);
conversationRouter.get("/:userId1/:userId2", conversationController.getConversation);
conversationRouter.get("/:userId", conversationController.getConversationsByUserId);
conversationRouter.post("/image", upload.single('image-file'), conversationController.uploadFile);
conversationRouter.get("/update/:conversationId/update", conversationController.updateConversationById);

export default conversationRouter;
