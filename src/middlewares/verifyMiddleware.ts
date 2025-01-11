import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: any;
}

async function verify(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        // Extract the token from the header
        const token = req.headers?.authorization?.split(" ")[1];

        // Handle missing token
        if (!token) {
            res.status(401).json({
                acknowledgement: false,
                message: "Unauthorized",
                description: "No token found to persist an existing user for a long time",
            });
            return;
        }

        // Verify the token and set `user` on the request object
        jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    acknowledgement: false,
                    message: "Unauthorized",
                    description: "Invalid or expired token",
                });
                return;
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(401).json({
            acknowledgement: false,
            message: "Unauthorized",
            description: "Sign in to your account to continue",
        });
    }
}

/* export token verification */
export default verify;