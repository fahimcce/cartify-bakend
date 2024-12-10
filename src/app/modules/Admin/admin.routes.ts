import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminValidationsSchemas } from "./admin.validation";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), adminController.getAllAdmin);
// router.get(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.getSingleAdminById
// );
router.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(adminValidationsSchemas.update),
  adminController.updateSingleAdminById
);
// router.delete(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.deleteSingleAdminById
// );
// router.patch(
//   "/soft/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.softDeleteSingleAdminById
// );

export const AdminRoutes = router;
