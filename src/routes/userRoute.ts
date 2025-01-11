import express from "express";
// import upload from "../middleware/uploadMiddleware";
import {userController} from "../controllers/userController";
// import verify from "../middleware/verifyMiddleware";
// import authorize from "../middleware/authorizeMiddleware";
// import passport from "passport";
import dotenv from "dotenv";
import token from "../utils/tokenUtil";
import User from "../models/userModel";
import verify from "../middlewares/verifyMiddleware";

dotenv.config()

const userRouter = express.Router();

// userRouter.post('/sign-up', upload.single("avatar"), userController.signUp);
userRouter.post('/sign-up', userController.signUp);
userRouter.post('/getOTP', userController.getOTP);
userRouter.post('/verifyOTP', userController.verifyOTP);

userRouter.post('/sign-in', userController.signIn);
userRouter.get('/me',verify, userController.persistLogin);
// userRouter.patch('/forgot-password', userController.forgotPassword);
// userRouter.patch('/reset-password', userController.resetPassword);
// userRouter.patch('/change-password-token', userController.resetPasswordToken);
// userRouter.patch('/update-information', verify, upload.single("avatar"), userController.updateInfo);
// userRouter.post('/send-reset-email', userController.sendResetEmail);
// userRouter.get('/all-users', verify, authorize("admin"), userController.getAllUser);
// userRouter.get('/get-user/:id', verify, authorize("admin"), userController.getUserById);
// userRouter.patch('/update-user/:id', verify, upload.single("avatar"), authorize("admin"), userController.updateUser);
// userRouter.delete('/delete-user/:id', verify, authorize("admin"), userController.deleteUser);
// userRouter.get('/sign-in-google', passport.authenticate('google', {scope: ['profile', 'email']}));

// userRouter.get(
//     '/auth/google/callback',
//     passport.authenticate('google', {failureRedirect: '/'}),
//     async (req, res) => {
//         // console.log("Auth google callback");
//         // @ts-ignore
//         const {name, email} = req.user; // Extract name and email from req.user
//         const user = await User.findOne({email: email});// Log or handle user data
//         if (!user) {
//             return res.redirect(`${process.env.ORIGIN_URL}/`);
//         }
//         const tokenAccess = token({
//             _id: user._id as string,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             status: user.status,
//         });
//         // res.cookie('token', tokenAccess,
//         //     //     {
//         //     //     maxAge : 10000,
//         //     //     secure: true
//         //     // }
//         // );// Set the token in a cookie
//         res.redirect(`${process.env.ORIGIN_URL}/?tokenAccess=${tokenAccess}`);
//     }
// );

// userRouter.post('redeem-loyalty-points/:id', verify, authorize("admin", "buyer", "seller"), userController.redeemLoyaltyPoints);

export default userRouter;