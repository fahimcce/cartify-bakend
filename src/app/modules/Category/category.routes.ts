import express, { NextFunction, Request, Response } from "express";
import { categoryController } from "./category.controller";
import { fileUploader } from "../../../helpers/fileUploaders";
import { categoryValidation } from "./category.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-category",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = categoryValidation.createCategory.parse(
      JSON.parse(req.body.data)
    );
    return categoryController.createCategory(req, res, next);
  }
);

router.get("/", auth(UserRole.ADMIN), categoryController.getCategories);

router.patch("/:id", auth(UserRole.ADMIN), categoryController.updateCategory);
router.delete("/:id", auth(UserRole.ADMIN), categoryController.deleteCategory);

export const CategoryRoutes = router;
