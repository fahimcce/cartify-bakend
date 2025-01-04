import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { shopController } from "./shop.controller";
import { shopValidation } from "./shop.validation";

const router = express.Router();

router.post(
  "/create-shop",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  shopController.createShop
);

router.get("/", shopController.getShops);
router.get("/:id", shopController.getSingleShop);
router.get("/followed/:customerId", shopController.getFollowedShops);
router.post("/follow", shopController.followShop);
router.post("/unfollow", shopController.unfollowShop);

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
