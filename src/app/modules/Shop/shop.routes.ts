import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploaders";
import { shopController } from "./shop.controller";
import { shopValidation } from "./shop.validation";

const router = express.Router();

router.post(
  "/create-shop",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = shopValidation.createShop.parse(JSON.parse(req.body.data));
    return shopController.createShop(req, res, next);
  }
);

router.get("/", auth(UserRole.ADMIN, UserRole.VENDOR), shopController.getShops);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  shopController.getSingleShop
);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  shopController.updateShop
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  shopController.deleteShop
);

export const ShopRoutes = router;
