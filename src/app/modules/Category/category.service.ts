import { Request } from "express";
import prisma from "../../../shared/prisma";
import { categorySearchableFields } from "./category.constant";
import { Prisma } from "@prisma/client";

const createCategory = async (req: Request) => {
  const result = await prisma.productCategory.create({
    data: req.body,
  });
  return result;
};

const getCategories = async (payload: any) => {
  let whereConditions: Prisma.ProductCategoryWhereInput | undefined;
  if (payload.name) {
    whereConditions = {
      OR: categorySearchableFields.map((field) => ({
        [field]: {
          contains: payload.name,
          mode: "insensitive",
        },
      })),
    };
  }
  const result = await prisma.productCategory.findMany({
    where: whereConditions,
  });
  return {
    data: result,
  };
};

const singleCategory = async (id: string) => {
  const result = await prisma.productCategory.findUniqueOrThrow({
    where: { id },
  });
  return result;
};
const updateCategory = async (id: string, payload: any) => {
  const result = await prisma.productCategory.update({
    where: { id },
    data: {
      ...payload,
    },
  });
  return result;
};
const deleteCategory = async (id: string) => {
  const result = await prisma.productCategory.delete({
    where: { id },
  });
  return result;
};

const getCategoryProducts = async (id: string) => {
  const categories = await prisma.categories.findMany({
    where: {
      categoryId: id,
    },
    include: {
      products: true,
    },
  });

  const products = categories.flatMap((category) => category.products);
  return products;
};

export const categoryServices = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  singleCategory,
  getCategoryProducts,
};
