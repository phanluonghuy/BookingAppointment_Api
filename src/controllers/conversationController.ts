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

    getConversationsByUserId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await conversationService.getConversationsByUserId(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    uploadFile: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await conversationService.uploadFile(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    updateConversationById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await conversationService.updateConversationById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
};
