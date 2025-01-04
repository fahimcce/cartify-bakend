import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { productController } from "./product.controller";

const router = express.Router();

router.post(
  "/create-product",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  productController.createProduct
);

router.post(
  "/create-duplicate-product/:id",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  productController.duplicateProduct
);

router.get("/", productController.getAllProduct);
router.get("/flashproducts", productController.getFlashSaleProduct);
router.get("/:id", productController.getSingleProduct);
router.delete("/:id", productController.deleteProduct);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  productController.updateProduct
);

export const ProductRoutes = router;
