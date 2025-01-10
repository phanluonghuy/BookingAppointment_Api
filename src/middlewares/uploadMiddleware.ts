import cloudinary from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer, {Multer} from 'multer';
import path from 'path';
import {Request} from 'express';
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (_: any, file: Express.Multer.File) => {
        return {
            folder: 'Doctor Pill Storage',
            public_id: `${Date.now()}_${file.originalname
                .replace(/[^\w\s.-]/g, '')
                .replace(/\s+/g, '-')
                .toLowerCase()}`,
        };
    },
});

const upload: Multer = multer({
    storage: storage,
    fileFilter: (_: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const supportedImage = /jpg|png|jpeg|pdf/i;
        const extension = path.extname(file.originalname);

        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error('File must be in png/jpg/jpeg/pdf format'));
        }
    },
});

export default upload;