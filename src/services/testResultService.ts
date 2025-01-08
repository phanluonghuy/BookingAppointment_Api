import { Request, Response } from "express";
import TestResult from "../models/testResultModel";

export const testResultService = {
    // Create a new TestResult
    createTestResult: async (req: Request, res: Response): Promise<Response> => {
        const { medicalRecordId, testName, labDetails, healStatusId} = req.body;

        if (!medicalRecordId || !testName || !healStatusId) {
            return res.status(400).json({
                acknowledgement: false,
                message: "Medical Record ID, Test Name, and Heal Status ID are required",
            });
        }

        try {
            const testResult = new TestResult({
                medicalRecordId,
                testName,
                labDetails,
                healStatusId,
            });

            await testResult.save();

            return res.status(201).json({
                acknowledgement: true,
                message: "Test result created successfully",
                data: testResult,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error creating test result",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get a test result by ID
    getTestResultById: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const testResult = await TestResult.findById(id);

            if (!testResult) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Test result not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                data: testResult,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving test result",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get test results by Medical Record ID
    getTestResultsByMedicalRecord: async (req: Request, res: Response): Promise<Response> => {
        const { medicalRecordId } = req.params;

        try {
            const testResults = await TestResult.find({ medicalRecordId });

            if (!testResults || testResults.length === 0) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "No test results found for this Medical Record",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                data: testResults,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error retrieving test results",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update a test result
    updateTestResult: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { testName, labDetails, healStatusId } = req.body;
        const results: any = req.file;

        try {
            const testResult = await TestResult.findById(id);

            if (!testResult) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Test result not found",
                });
            }

            if (testName) {
                testResult.testName = testName;
            }
            if (labDetails) {
                testResult.labDetails = labDetails;
            }
            if (healStatusId) {
                testResult.healStatusId = healStatusId;
            }

            if (results) {
                testResult.results = {
                    url: results.path || testResult.results?.url,
                    fileName: results.originalname || testResult.results?.fileName,
                    fileType: results.mimetype || testResult.results?.fileType,
                };
            }

            testResult.updatedAt = new Date();

            await testResult.save();

            return res.status(200).json({
                acknowledgement: true,
                message: "Test result updated successfully",
                data: testResult,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error updating test result",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },


    // Upload result file
    uploadResultFile: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({
                acknowledgement: false,
                message: "No file uploaded",
            });
        }

        try {
            const testResult = await TestResult.findById(id);

            if (!testResult) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Test result not found",
                });
            }

            testResult.results = {
                url: req.file.path,
                fileName: req.file.originalname,
                fileType: req.file.mimetype,
            };
            testResult.updatedAt = new Date();

            await testResult.save();

            return res.status(200).json({
                acknowledgement: true,
                message: "Test result file uploaded successfully",
                data: testResult,
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error uploading result file",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete a test result
    deleteTestResult: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        try {
            const deletedTestResult = await TestResult.findByIdAndDelete(id);

            if (!deletedTestResult) {
                return res.status(404).json({
                    acknowledgement: false,
                    message: "Test result not found",
                });
            }

            return res.status(200).json({
                acknowledgement: true,
                message: "Test result deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                acknowledgement: false,
                message: "Error deleting test result",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
