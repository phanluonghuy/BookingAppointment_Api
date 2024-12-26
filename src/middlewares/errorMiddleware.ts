import {Response} from 'express';

// Type for the error parameter (you can extend this based on your custom error types)
interface CustomError extends Error {
    statusCode?: number; // Optional custom property for HTTP status code, if applicable
}

function error(err: CustomError, _: any, res: Response, __: any): void {
    res.status(err.statusCode || 500).send({
        acknowledgement: false,
        message: err.name,
        description: err.message,
    });
}

export default error;