import express, { NextFunction, Request, Response } from "express";
import { categoryController } from "./category.controller";
import { categoryValidation } from "./category.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-category",
  auth(UserRole.ADMIN),
  categoryController.createCategory
);

router.get("/", categoryController.getCategories);
router.get("/category-products/:id", categoryController.getCategoryProducts);

router.patch("/:id", auth(UserRole.ADMIN), categoryController.updateCategory);
router.delete("/:id", auth(UserRole.ADMIN), categoryController.deleteCategory);

export const CategoryRoutes = router;
