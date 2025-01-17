import { Request, Response } from "express";
import Payment from "../models/paymentModel";
import Insurance from "../models/insuranceModel";

export const paymentService = {
    // Create a new payment
    createPayment: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId } = req.body;
            const {
                appointmentId,
                amount,
                advanceAmount,
                isInsuranceUsed,
                paymentMethod,
                transactionId,
            } = req.body;

            if (!appointmentId || !amount || !advanceAmount || !paymentMethod || !transactionId) {
                return res.json({
                    acknowledgement: false,
                    message: "All required fields must be provided",
                });
            }

            let insuranceCoverage = 0;
            if (isInsuranceUsed) {
                const insurance = await Insurance.findOne({ patientId });
                if (!insurance) {
                    return res.json({
                        acknowledgement: false,
                        message: "No insurance information found for this patient",
                    });
                }

                // Calculate insurance coverage based on benefit level
                const benefitLevel = parseInt(insurance.benefitLevel, 10);
                switch (benefitLevel) {
                    case 1:
                    case 5:
                        insuranceCoverage = amount; // 100% coverage
                        break;
                    case 2:
                        insuranceCoverage = amount * 0.9; // Example: 90% coverage
                        break;
                    case 3:
                        insuranceCoverage = amount * 0.95; // 95% coverage
                        break;
                    case 4:
                        insuranceCoverage = amount * 0.8; // 80% coverage
                        break;
                    default:
                        insuranceCoverage = 0;
                }
            }

            const totalAmountAfterInsurance = amount - insuranceCoverage - advanceAmount;
            const finalAmount = Math.max(totalAmountAfterInsurance, 0);

            let refundAmount = 0;
            let refundStatus = undefined;
            if (totalAmountAfterInsurance < 0) {
                // Nếu số tiền thanh toán đã vượt quá số tiền phải thanh toán
                refundAmount = Math.abs(totalAmountAfterInsurance);
                refundStatus = 'pending';
            }

            const payment = new Payment({
                patientId,
                appointmentId,
                amount,
                advanceAmount,
                finalAmount,
                isInsuranceUsed,
                insuranceCoverage,
                paymentMethod,
                transactionId,
                refundAmount,
                refundStatus
            });

            await payment.save();

            return res.json({
                acknowledgement: true,
                message: "Payment created successfully",
                data: payment,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get payment by ID
    getPaymentById: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const payment = await Payment.findById(id);

            if (!payment) {
                return res.json({
                    acknowledgement: false,
                    message: "Payment not found",
                });
            }

            return res.json({
                acknowledgement: true,
                data: payment,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get payments by patient
    getPaymentsByPatient: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { patientId } = req.params;

            const payments = await Payment.find({ patientId });

            if (!payments || payments.length === 0) {
                return res.json({
                    acknowledgement: false,
                    message: "No payments found for this patient",
                });
            }

            return res.json({
                acknowledgement: true,
                data: payments,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Get payments by appointment
    getPaymentsByAppointment: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { appointmentId } = req.params;

            const payments = await Payment.find({ appointmentId });

            if (!payments || payments.length === 0) {
                return res.json({
                    acknowledgement: false,
                    message: "No payments found for this appointment",
                });
            }

            return res.json({
                acknowledgement: true,
                data: payments,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update payment method
    updatePaymentMethod: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { paymentMethod } = req.body;

            if (!paymentMethod || !["credit_card", "paypal", "bank_transfer", "cash"].includes(paymentMethod)) {
                return res.json({
                    acknowledgement: false,
                    message: "Payment method is required and must be one of 'credit_card', 'paypal', 'bank_transfer', or 'cash'",
                });
            }

            const payment = await Payment.findById(id);

            if (!payment) {
                return res.json({
                    acknowledgement: false,
                    message: "Payment not found",
                });
            }

            payment.paymentMethod = paymentMethod;
            payment.updatedAt = new Date();

            await payment.save();

            return res.json({
                acknowledgement: true,
                message: "Payment method updated successfully",
                data: payment,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update payment status
    updatePaymentStatus: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status || !["pending", "completed", "failed"].includes(status)) {
                return res.json({
                    acknowledgement: false,
                    message: "Payment status is required and must be one of 'pending', 'completed', or 'failed'",
                });
            }

            const payment = await Payment.findById(id);

            if (!payment) {
                return res.json({
                    acknowledgement: false,
                    message: "Payment not found",
                });
            }

            payment.paymentStatus = status;
            payment.updatedAt = new Date();

            await payment.save();

            return res.json({
                acknowledgement: true,
                message: "Payment status updated successfully",
                data: payment,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Update refund status
    updateRefundStatus: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { status} = req.body;

            if (!status || !["none", "pending", "completed", "failed"].includes(status)) {
                return res.json({
                    acknowledgement: false,
                    message: "Refund status is required and must be one of 'none', 'pending', 'completed', or 'failed'",
                });
            }

            const payment = await Payment.findById(id);

            if (!payment) {
                return res.json({
                    acknowledgement: false,
                    message: "Payment not found",
                });
            }

            payment.refundStatus = status;
            payment.updatedAt = new Date();

            await payment.save();

            return res.json({
                acknowledgement: true,
                message: "Refund status updated successfully",
                data: payment,
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },

    // Delete payment
    deletePayment: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;

            const deletedPayment = await Payment.findByIdAndDelete(id);

            if (!deletedPayment) {
                return res.json({
                    acknowledgement: false,
                    message: "Payment not found",
                });
            }

            return res.json({
                acknowledgement: true,
                message: "Payment deleted successfully",
            });
        } catch (error) {
            return res.json({
                acknowledgement: false,
                message: "Error",
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
    },
};
