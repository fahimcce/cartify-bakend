import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ICloudinaryResponse, IFileResponse } from "../app/interfaces/file";

//multer initialization
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//cloudinary Configuration
cloudinary.config({
  cloud_name: "dfm0mdgzm",
  api_key: "575413247766987",
  api_secret: "5Z3cn-yW64MyIQsWcREHED2jYoI",
});
// Upload an image
const uploadToCloudinary = async (
  file: IFileResponse
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
