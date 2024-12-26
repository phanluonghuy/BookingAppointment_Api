/* external import */
import jwt from 'jsonwebtoken';

// Define the type for the token payload
interface TokenPayload {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

function token({_id, name, email, role, status}: TokenPayload): string {
    // grab specific user info to generate jwt token
    const accessToken = jwt.sign(
        {
            _id,
            name,
            email,
            role,
            status,
        },
        process.env.TOKEN_SECRET as string,
        {
            expiresIn: '7d',
        }
    );

    return accessToken;
}

// Function to create a one-time-use token for password reset
function createPasswordResetToken(_id: string): string {
    // Generate a JWT with just the _id for security reasons
    const resetToken = jwt.sign(
        {_id},
        process.env.TOKEN_SECRET as string,
        {
            expiresIn: '1h', // Token is valid for 1 hour
        }
    );

    return resetToken;
}

// Function to decode the token and get the _id
function decodeResetToken(token: string): string {
    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;

        // Check if the decoded token has the expected payload
        if (!decoded || !decoded._id) {
            throw new Error('Invalid token payload');
        }

        return decoded._id;
    } catch (error) {
        // Handle token expiration error
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token has expired');
        }

        // Handle other verification errors
        throw new Error('Invalid token');
    }
}

function verifyandget_id(token: string): string {
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayload;

        // Check if the decoded token has the expected payload
        if (!decoded || !decoded._id) {
            throw new Error('Invalid token payload');
        }

        return decoded._id;
    } catch (error) {
        // Handle token expiration error
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token has expired');
        }

        // Handle other verification errors
        throw new Error('Invalid token');
    }
}

/* export token utility */
export default token;
// export {verifyandget_id, createPasswordResetToken, decodeResetToken};