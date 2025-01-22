import express from "express";
import { conversationController } from "../controllers/conversationController";

const conversationRouter = express.Router();

conversationRouter.post("/", conversationController.createConversation);
conversationRouter.get("/:userId1/:userId2", conversationController.getConversation);

export default conversationRouter;
