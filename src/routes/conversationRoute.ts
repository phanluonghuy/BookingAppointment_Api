import express from "express";
import { conversationController } from "../controllers/conversationController";

const conversationRouter = express.Router();

conversationRouter.post("/", conversationController.createConversation);
conversationRouter.get("/:userId1/:userId2", conversationController.getConversation);
conversationRouter.get("/:userId", conversationController.getConversationsByUserId);

export default conversationRouter;
