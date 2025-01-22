import { Request, Response, NextFunction } from "express";
import { conversationService } from "../services/conversationService";

export const conversationController = {
    createConversation: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await conversationService.createConversation(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    getConversation: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await conversationService.getConversation(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
};
