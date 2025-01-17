import { Request, Response, NextFunction } from "express";
import { testResultService } from "../services/testResultService";

export const testResultController = {
    // Create a new TestResult
    createTestResult: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await testResultService.createTestResult(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Get a test result by ID
    getTestResultById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await testResultService.getTestResultById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Get test results by Medical Record ID
    getTestResultsByMedicalRecord: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await testResultService.getTestResultsByMedicalRecord(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Update a test result
    updateTestResult: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await testResultService.updateTestResult(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Upload result file
    uploadResultFile: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await testResultService.uploadResultFile(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },

    // Delete a test result
    deleteTestResult: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await testResultService.deleteTestResult(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.path} || Method: ${req.method}`);
        }
    },
};
