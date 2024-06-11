import { writeAsyncIterableToWritable } from "@remix-run/node";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

async function uploadImage(data: AsyncIterable<Uint8Array>) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "remix",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    writeAsyncIterableToWritable(data, uploadStream)
      .then(() => {
        // Stream writing completed
        console.log("Imagen subida con exito!");
      })
      .catch((error) => {
        // Handle stream writing error
        console.error("Error subiendo la imagen:", error);
        reject(error);
      });
  });
}

console.log("configs", cloudinary.v2.config());
export { uploadImage };
