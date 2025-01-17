import { Request, Response, NextFunction } from "express";
import { workScheduleService } from "../services/workScheduleService";

export const workScheduleController = {
    createWorkSchedule: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await workScheduleService.createWorkSchedule(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    getWorkScheduleById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await workScheduleService.getWorkScheduleById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    getWorkScheduleByDoctor: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await workScheduleService.getWorkScheduleByDoctor(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    updateWorkSchedule: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await workScheduleService.updateWorkSchedule(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    deleteWorkSchedule: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await workScheduleService.deleteWorkSchedule(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    deleteAvailableTime: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await workScheduleService.deleteAvailableTime(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },
};
