import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploaders";
// import { userValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
const router = express.Router();

// router.get(
//   "/",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   userController.getAllUsers
// );
// router.get(
//   "/me",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
//   userController.getMyProfile
// );

// router.patch(
//   "/:id/status",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   // validateRequest(userValidation.statusUpdate),
//   userController.updateStatus
// );

router.post(
  "/create-admin",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.creatAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);
router.post(
  "/create-vendor",
  //   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.creatVendor.parse(JSON.parse(req.body.data));
    return userController.createVendor(req, res, next);
  }
);
router.post(
  "/create-customer",
  //   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.creatCustomer.parse(JSON.parse(req.body.data));
    return userController.createCustomer(req, res, next);
  }
);

router.patch("/:id", auth(UserRole.ADMIN), userController.updateUser);

// router.post(
//   "/create-doctor",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   fileUploader.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data));
//     return userController.createDoctor(req, res, next);
//   }
// );

// router.post(
//   "/create-patient",
//   fileUploader.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = userValidation.createPatient.parse(JSON.parse(req.body.data));
//     return userController.createPatient(req, res, next);
//   }
// );

// router.patch(
//   "/update-profile",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
//   fileUploader.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     return userController.updateMyProfile(req, res, next);
//   }
// );

export const userRoutes = router;
