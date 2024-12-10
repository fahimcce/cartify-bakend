import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploaders";
import { productValidation } from "./product.validation";
import { productController } from "./product.controller";

const router = express.Router();

router.post(
  "/create-product",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return productController.createProduct(req, res, next);
  }
);

router.post(
  "/create-duplicate-product/:id",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  productController.duplicateProduct
);

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getSingleProduct);
router.delete("/:id", productController.deleteProduct);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  // validateRequest(adminValidationsSchemas.update),
  productController.updateProduct
);

// router.get("/", auth(UserRole.ADMIN, UserRole.VENDOR), shopController.getShops);
// router.get(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.VENDOR),
//   shopController.getSingleShop
// );
// router.patch(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.VENDOR),
//   shopController.updateShop
// );
// router.delete(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.VENDOR),
//   shopController.deleteShop
// );

export const ProductRoutes = router;
