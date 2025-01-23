import Conversation from "../models/conversationModel";
import { Request, Response } from "express";
import TestResult from "../models/testResultModel";
import Message from "../models/messageModel";

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
    },

    updateConversationById: async (req: Request, res: Response): Promise<Response> => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.json({
                acknowledgement: false,
                message: "Missing required field: conversationId",
            });
        }

        try {
            const conversation = await Conversation.findById(conversationId);

            if (!conversation) {
                return res.json({
                    acknowledgement: false,
                    message: "Conversation not found",
                });
            }

            const latestMessage = await Message.findOne({
                from: { $in: conversation.participants },
                to: { $in: conversation.participants },
            })
                .sort({ createdAt: -1 })
                .limit(1);

            console.log(latestMessage)

            if (!latestMessage) {
                return res.json({
                    acknowledgement: false,
                    message: "No messages found in this conversation",
                });
            }

            conversation.lastMessageContent = latestMessage.content;
            conversation.lastMessageTimestamp = latestMessage.createdAt;

            await conversation.save();

            return res.json({
                acknowledgement: true,
                message: "Conversation updated successfully",
                data: conversation,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error updating conversation",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    uploadFile: async (req: Request, res: Response): Promise<Response> => {
        if (!req.file) {
            return res.json({
                acknowledgement: false,
                message: "No file uploaded",
            });
        }

        try {
            const fileUrl = (req.file as any).path;

            return res.json({
                acknowledgement: true,
                message: "Image file uploaded successfully",
                data: fileUrl,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error uploading image file",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    }
};
