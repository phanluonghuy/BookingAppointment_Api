/* external import */
import { v2 as cloudinary } from 'cloudinary';

/* Utility to extract public_id from a Cloudinary URL */
function extractPublicIdFromPath(path: string): string {
    const segments = path.split('/');
    const fileName = segments[segments.length - 1];
    const publicId = fileName.split('.')[0]; // Remove the file extension
    return segments.slice(-2, -1)[0] + '/' + publicId; // Handles folders if any
}

/* remove image from Cloudinary by path */
async function remove(path: string): Promise<void> {
    const publicId = extractPublicIdFromPath(path) + ".jpg"; // Extract the public_id
    // console.log('Removing image with public_id:', publicId);
    let decodedUrl = publicId.replace(/%20/g, ' ');
    await cloudinary.uploader.destroy(decodedUrl, (error, result) => {
        if (error) {
            console.error('Error removing image:', error);
        } else {
            // console.log('Image removal result:', result);
        }
    });
}

export default remove;
