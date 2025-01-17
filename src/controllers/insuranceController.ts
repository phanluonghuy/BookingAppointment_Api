import { Request, Response, NextFunction } from "express";
import { insuranceService } from "../services/insuranceService";

export const insuranceController = {
    // Tạo mới một insurance
    createInsurance: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await insuranceService.createInsurance(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Lấy danh sách insurance theo bệnh nhân
    getInsurancesByPatient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await insuranceService.getInsurancesByPatient(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Lấy chi tiết insurance theo ID
    getInsuranceById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await insuranceService.getInsuranceById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Cập nhật insurance theo ID
    updateInsurance: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await insuranceService.updateInsurance(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Xóa insurance theo ID
    deleteInsurance: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await insuranceService.deleteInsurance(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },
};
