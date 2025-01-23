import Conversation from "../models/conversationModel";
import { Request, Response } from "express";

export const conversationService = {
    createConversation: async (req: Request, res: Response): Promise<Response> => {
        const { userId1, userId2 } = req.body;

        if (!userId1 || !userId2) {
            return res.json({
                acknowledgement: false,
                message: "Missing required fields: userId1, userId2",
            });
        }

        try {
            const existingConversation = await Conversation.findOne({
                participants: { $all: [userId1, userId2] },
            });

            if (existingConversation) {
                return res.json({
                    acknowledgement: false,
                    message: "Conversation already exists",
                });
            }

            const conversation = await Conversation.create({
                participants: [userId1, userId2],
            });

            return res.json({
                acknowledgement: true,
                message: "Conversation created successfully",
                data: conversation,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error creating conversation",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    getConversation: async (req: Request, res: Response): Promise<Response> => {
        const { userId1, userId2 } = req.params;

        if (!userId1 || !userId2) {
            return res.json({
                acknowledgement: false,
                message: "Missing required fields: userId1, userId2",
            });
        }

        try {
            const conversation = await Conversation.findOne({
                participants: { $all: [userId1, userId2] },
            }).populate("participants");

            if (!conversation) {
                return res.json({
                    acknowledgement: false,
                    message: "Conversation not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: conversation,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving conversation",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    getConversationsByUserId: async (req: Request, res: Response): Promise<Response> => {
        const { userId } = req.params;

        if (!userId) {
            return res.json({
                acknowledgement: false,
                message: "Missing required fields: userId",
            });
        }

        try {
            const conversations = await Conversation.find({
                participants: { $all: [userId] },
            }).populate("participants");

            if (!conversations) {
                return res.json({
                    acknowledgement: false,
                    message: "Conversations not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: conversations,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error retrieving conversations",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    }
};
