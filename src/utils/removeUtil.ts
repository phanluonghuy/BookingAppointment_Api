/* external import */
import { v2 as cloudinary } from 'cloudinary';

// Remove image from cloudinary
async function remove(path: string): Promise<void> {
    await cloudinary.uploader.destroy(path, (error, result) => {
        if (error) {
            console.error('Error removing image:', error);
        } else {
            // console.log('Image removal result:', result);
        }
    });
}

export default remove;
