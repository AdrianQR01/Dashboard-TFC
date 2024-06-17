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
          console.error("Error subiendo la imagen:", error);
          resolve(error); // Return an empty string on error
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
        console.log("Error subiendo la imagen:", error);
        reject("");
      });
  });
}

export { uploadImage };
