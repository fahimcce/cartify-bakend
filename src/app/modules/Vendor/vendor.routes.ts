import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { vendorController } from "./vendor.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/my-shop",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  vendorController.getMyShop
);

router.get(
  "/my-shop-products",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  vendorController.getMyShopProducts
);

export const VendorRoutes = router;
