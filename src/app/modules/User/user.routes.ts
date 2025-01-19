import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
  userController.myProfile
);

// router.patch(
//   "/:id/status",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   // validateRequest(userValidation.statusUpdate),
//   userController.updateStatus
// );

router.post(
  "/create-admin",
  // auth(UserRole.ADMIN),
  // validateRequest(userValidation.creatAdmin),
  userController.createAdmin
);

router.post(
  "/create-vendor",
  // validateRequest(userValidation.creatVendor),
  userController.createVendor
);

router.post(
  "/create-customer",
  // validateRequest(userValidation.creatCustomer),
  userController.createCustomer
);

router.patch(
  "/updateProfile",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
  userController.updateUser
);
router.patch("/:id", auth(UserRole.ADMIN), userController.updateUserToDB);

export const userRoutes = router;
