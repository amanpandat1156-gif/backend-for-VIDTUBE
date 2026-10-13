import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Cloudinary par upload karo
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // Upload hote hi local temporary file delete kar do
    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    // Agar fail ho jaye, tab bhi temp file delete kar do taaki storage na bhare
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };