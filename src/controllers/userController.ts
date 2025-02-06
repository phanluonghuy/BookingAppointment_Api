import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
    signUp: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.signUp(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getOTP: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getOTP(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getForgotOTP: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getForgotOTP(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    verifyOTP: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.verifyOTP(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    verifyForgotOTP: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.verifyForgotOTP(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    persistLogin: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            await userService.persistLogin(req, res);
            // const token = req.headers.authorization?.split(' ')[1];
            // console.log('Token:', token);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    signIn: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.signIn(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Patient
    createPatient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.createPatient(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getAllPatients: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getAllPatients(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getPatientById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getPatientById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    updatePatient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.updatePatient(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    // Doctor
    createDoctor: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.createDoctor(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getAllDoctors: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getAllDoctors(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getDoctorsInfo: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getDoctorsInfo(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getDoctorById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getDoctorById(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    updateDoctor: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.updateDoctor(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    getTopDoctors : async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
        try {
            await userService.getTopDoctors(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);}
    },
    getDoctorsBySpecialization: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getDoctorsBySpecialization(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    getDoctorByIdWithFullInfo: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getDoctorByIdWithFullInfo(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },

    getTopDoctors: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.getTopDoctors(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },


    // forgotPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.forgotPassword(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    resetPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.resetPassword(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    changePassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.changePassword(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    updateInfo: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await userService.updateInfo(req, res);
        } catch (error) {
            next(error);
        } finally {
            console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
        }
    },
    // sendResetEmail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.sendResetEmail(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    // resetPasswordEmail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.resetPasswordEmail(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    // resetPasswordToken: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.resetPasswordToken(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    // getAllUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.getAllUser(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    // getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.getUserById(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    // updateUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.updateUser(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    // deleteUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.deleteUser(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // },
    // redeemLoyaltyPoints: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         await userService.redeemLoyaltyPoints(req, res);
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         console.log(`Route: ${req.baseUrl}${req.path} || Method: ${req.method}`);
    //     }
    // }
}

