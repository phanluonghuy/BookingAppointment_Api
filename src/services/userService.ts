import {Request, Response} from "express";
import User from "../models/userModel";
import token from "../utils/tokenUtil";
// import remove from "../utils/removeUtil";
// import sendEmail from "../utils/emailUtil";
// import Cart from "../models/cartModel";
// import Address from "../models/userAddressModel";

export const userService = {
    signUp: async (req: Request, res: Response): Promise<void> => {
        const {body} = req;
        // console.log('Body:', body);
        if (!body.name || !body.email || !body.password || !body.phone || !body.dateOfBirth) {
            res.status(400).json({
                acknowledgement: false,
                message: "Error",
                description: "All required fields must be provided",
            });
            return;
        }

        const user = new User({
            name: body.name,
            email: body.email,
            password: body.password,
            phone: body.phone,
            dateOfBirth: body.dateOfBirth,
        });

        // if (file) {
        //     user.avatar = {
        //         url: file.path,
        //         public_id: file.filename,
        //     };
        // }

        try {
            await user.save();
            res.status(201).json({
                acknowledgement: true,
                message: "Created",
                description: "User created successfully",
            });
            return;
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({
                acknowledgement: false,
                message: "Error",
                description: "User creation failed",
            });
            return;
        }
    },
    // persistLogin: async (req: Request, res: Response): Promise<void> => {
    //     const token = req.headers.authorization?.split(" ")[1];

    //     if (!token) {
    //         res.status(401).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "No token provided",
    //         });
    //         return;
    //     }
    //     var _id;
    //     try {
    //         _id = verifyandget_id(token as string);
    //     } catch (error) {
    //         // Log the error for debugging purposes
    //         // console.error("Error in verifying token:", error);

    //         // Send a 401 response with a detailed error message
    //         res.status(401).json({
    //             acknowledgement: false,
    //             message: "Unauthorized", // A more descriptive message than just "Error"
    //             description:
    //                 error instanceof Error ? error.message : "An unknown error occurred",
    //         });

    //         return; // End the function execution
    //     }

    //     const user = await User.findById(_id)
    //         .populate([
    //             {
    //                 path: "cart",
    //                 populate: [
    //                     {path: "product", populate: ["brand", "category", "store"]},
    //                     "user",
    //                 ],
    //             },
    //             {
    //                 path: "reviews",
    //                 populate: ["product", "reviewer"],
    //             },
    //             {
    //                 path: "favorites",
    //                 populate: [
    //                     {
    //                         path: "product",
    //                         populate: ["brand", "category", "store"],
    //                     },
    //                     "user",
    //                 ],
    //             },
    //             {
    //                 path: "purchases",
    //                 populate: ["customer", "products.product"],
    //             },
    //             "store",
    //             "brand",
    //             "category",
    //             "products",
    //         ]);

    //     if (!user) {
    //         res.status(404).json({
    //             acknowledgement: false,
    //             message: "Not Found",
    //             description: "User not found",
    //         });
    //     } else {
    //         res.status(200).json({
    //             acknowledgement: true,
    //             message: "OK",
    //             description: "Login successful",
    //             data: user,
    //         });
    //     }
    // },

    signIn: async (req: Request, res: Response): Promise<void> => {
        const user = await User.findOne({email: req.body.email});
        console.log("User:", req.body);
        if (!user) {
            res.status(404).json({
                acknowledgement: false,
                message: "Error",
                description: "User not found",
            });
            return;
        } else {
            if (user.comparePassword(req.body.password, user.password)) {
                if (user.status === "inactive") {
                    res.status(401).json({
                        acknowledgement: false,
                        message: "Error",
                        description: "User account is inactive",
                    });
                    return;
                } else {
                    const tokenAccess = token({
                        _id: user._id as string,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        status: user.status,
                    });
                    res.status(200).json({
                        acknowledgement: true,
                        message: "Success",
                        // description: (user.role === "guest") ? "Create Guest session successfully" : "User logged in successfully",
                        description: "User logged in successfully",
                        token: tokenAccess,
                    });
                    return;
                }
            } else {
                res.status(401).json({
                    acknowledgement: false,
                    message: "Error",
                    description: "Invalid password",
                });
                return;
            }
        }
    },
    // forgotPassword: async (req: Request, res: Response): Promise<void> => {
    //     const user = await User.findOne({email: req.body.email});
    //     if (!user) {
    //         res.status(404).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "User not found",
    //         });
    //         return;
    //     }
    //     const resetToken = createPasswordResetToken(user._id as string);
    //     await sendEmail(resetToken, req.body.email);
    //     res.status(200).json({
    //         acknowledgement: true,
    //         message: "Success",
    //         description: "Sent email successfully",
    //     });
    //     return;
    // },
    // resetPassword: async (req: Request, res: Response): Promise<void> => {
    //     const token = req.headers.authorization?.split(" ")[1];
    //     const _id = verifyandget_id(token as string);
    //     const user = await User.findById(_id);
    //     // console.log("Req body:", req.body.currentPassword);
    //     // console.log("User:", user);
    //     if (user?.comparePassword(req.body.currentPassword, user.password)) {
    //         const hashpassword = await user.encryptedPassword(req.body.newPassword);
    //         await User.findByIdAndUpdate(
    //             _id,
    //             {
    //                 password: hashpassword,
    //             },
    //             {
    //                 runValidators: false,
    //                 returnOriginal: false,
    //             }
    //         );
    //         res.status(200).json({
    //             acknowledgement: true,
    //             message: "Success",
    //             description: "Password updated successfully",
    //         });
    //     } else {
    //         res.status(401).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "Invalid password",
    //         });
    //         return;
    //     }
    // },
    // updateInfo: async (req: Request, res: Response): Promise<void> => {
    //     const token = req.headers.authorization?.split(" ")[1];
    //     const _id = verifyandget_id(token as string);
    //     const user = req.body;

    //     let addresses = [];
    //     if (req.body.addresses) {
    //         addresses = req.body.addresses.map((address: any) => JSON.parse(address));
    //     }


    //     const address: any = [];

    //     // Create address subdocuments
    //     addresses.forEach((add: any) => {
    //         // Directly pushing the parsed objects into the address array
    //         address.push(new Address(
    //             {
    //                 primary: add.primary ?? false,
    //                 city: add.city,
    //                 district: add.district,
    //                 street: add.street,
    //                 zipCode: add.zipCode,
    //                 contactNumber: add.contactNumber,
    //             }
    //         ));
    //     });


    //     // Assign the created addresses to the user object
    //     user.address = address;

    //     const exitsUser = await User.findById(_id);

    //     if (!req.body.avatar && req.file) {
    //         await remove(exitsUser!.avatar?.public_id!);
    //         // console.log("req.avatar:", req.body.avatar);
    //         user!.avatar = {
    //             url: req.file.path,
    //             public_id: req.file.filename,
    //         };
    //     }

    //     const updatedUser = await User.findByIdAndUpdate(exitsUser?._id, {$set: user}, {runValidators: true});
    //     // await updatedUser?.updateOne({ $set: { address: address } });
    //     // console.log("User:", user);
    //     // console.log("Updated user:", updatedUser);
    //     res.status(200).json({
    //         acknowledgement: true,
    //         message: "OK",
    //         description: `${exitsUser?.name}'s information updated successfully`,
    //     });
    // },
    // sendResetEmail: async (req: Request, res: Response): Promise<void> => {
    //     const email = req.body.email;
    //     // console.log("Email:", email);
    //     res.send("Email sent successfully");
    // },
    // resetPasswordEmail: async (req: Request, res: Response): Promise<void> => {
    //     const resetToken = req.params.resetToken;
    //     // console.log("Reset token:", resetToken);
    //     const _id = decodeResetToken(resetToken);
    //     const user = await User.findById(_id);
    //     if (!user) {
    //         res.status(404).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "User not found",
    //         });
    //         return;
    //     }
    //     const tokenAccess = token({
    //         _id: user._id as string,
    //         name: user.name,
    //         email: user.email,
    //         role: user.role,
    //         status: user.status,
    //     });
    //     res.status(200).json({
    //         acknowledgement: true,
    //         message: "Success",
    //         description: "User logged in successfully",
    //         token: tokenAccess,
    //     });
    //     return;
    // },
    // resetPasswordToken: async (req: Request, res: Response): Promise<void> => {
    //     const token = req.headers.authorization?.split(" ")[1];
    //     // console.log("Token:", req.headers.authorization);
    //     const _id = decodeResetToken(token as string);
    //     const user = await User.findById(_id);
    //     if (!user) {
    //         res.status(404).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "Invalid token",
    //         });
    //         return;
    //     }
    //     const hash = user.encryptedPassword(req.body.password);
    //     await user.updateOne({password: hash});
    //     res.status(200).json({
    //         acknowledgement: true,
    //         message: "Success",
    //         description: "Password updated successfully",
    //     });
    // },
    // getAllUser: async (req: Request, res: Response): Promise<void> => {
    //     const users = await User.find();
    //     res.status(200).json({
    //         acknowledgement: true,
    //         message: "Success",
    //         description: "All users",
    //         data: users,
    //     });
    // },
    // getUserById: async (req: Request, res: Response): Promise<void> => {
    //     const user = await User.findById(req.params.id);
    //     if (!user) {
    //         res.status(404).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "User not found",
    //         });
    //         return;
    //     }
    //     res.status(200).json({
    //         acknowledgement: true,
    //         message: "Success",
    //         description: "User found",
    //         data: user,
    //     });
    // },
    // updateUser: async (req: Request, res: Response): Promise<void> => {
    //     const exitsUser = await User.findById(req.params.id);
    //     const user = req.body;
    //     if (!req.body.avatar && req.file) {
    //         await remove(exitsUser!.avatar?.public_id!);
    //         // console.log("req.avatar:", req.body.avatar);
    //         user!.avatar = {
    //             url: req.file.path,
    //             public_id: req.file.filename,
    //         };
    //     }
    //     await User.findByIdAndUpdate(exitsUser?._id, {$set: user}, {runValidators: true});
    //     res.status(200).json({
    //         acknowledgement: true,
    //         message: "OK",
    //         description: `${exitsUser?.name}'s information updated successfully`,
    //     });
    // },
    // deleteUser: async (req: Request, res: Response): Promise<void> => {
    //     const user = await User.findById(req.params.id);
    //     if (!user) {
    //         res.status(404).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "User not found",
    //         });
    //         return;
    //     }
    //     await remove(user!.avatar?.public_id!);
    //     if (user?.cart.length > 0) {
    //         user.cart.forEach(async (cart) => {
    //             await Cart.findByIdAndDelete(cart);
    //         });
    //     }
    // },

    // getLoyaltyPoints: async (req: Request, res: Response): Promise<void> => {
    //     const token = req.headers.authorization?.split(" ")[1];
    //     const _id = verifyandget_id(token as string);

    //     try {
    //         const user = await User.findById(_id);
    //         if (!user) {
    //             res.status(404).json({
    //                 acknowledgement: false,
    //                 message: "Error",
    //                 description: "User not found",
    //             });
    //             return;
    //         }

    //         res.status(200).json({
    //             acknowledgement: true,
    //             message: "Success",
    //             description: "Loyalty points retrieved successfully",
    //             data: {loyaltyPoints: user.loyaltyPoints},
    //         });
    //     } catch (error) {
    //         console.error("Error:", error);
    //         res.status(500).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "Failed to retrieve loyalty points",
    //         });
    //     }
    // },

    // awardLoyaltyPoints: async (userId: string, points: number): Promise<void> => {
    //     try {
    //         const user = await User.findById(userId);
    //         if (!user) throw new Error("User not found");

    //         user.loyaltyPoints += points;
    //         await user.save();
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // },

    // redeemLoyaltyPoints: async (req: Request, res: Response): Promise<void> => {
    //     const token = req.headers.authorization?.split(" ")[1];
    //     const _id = verifyandget_id(token as string);

    //     const {pointsToRedeem} = req.body;

    //     try {
    //         const user = await User.findById(_id);
    //         if (!user) {
    //             res.status(404).json({
    //                 acknowledgement: false,
    //                 message: "Error",
    //                 description: "User not found",
    //             });
    //             return;
    //         }

    //         if (user.loyaltyPoints < pointsToRedeem) {
    //             res.status(400).json({
    //                 acknowledgement: false,
    //                 message: "Error",
    //                 description: "Insufficient loyalty points",
    //             });
    //             return;
    //         }

    //         user.loyaltyPoints -= pointsToRedeem;
    //         await user.save();

    //         res.status(200).json({
    //             acknowledgement: true,
    //             message: "Success",
    //             description: "Loyalty points redeemed successfully",
    //             data: {loyaltyPoints: user.loyaltyPoints},
    //         });
    //     } catch (error) {
    //         console.error("Error:", error);
    //         res.status(500).json({
    //             acknowledgement: false,
    //             message: "Error",
    //             description: "Failed to redeem loyalty points",
    //         });
    //     }
    // },
};