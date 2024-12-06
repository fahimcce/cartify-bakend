import { Request } from "express";
import { IFileResponse } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploaders";
import prisma from "../../../shared/prisma";
import { categorySearchableFields } from "./category.constant";
import { Prisma } from "@prisma/client";

const createCategory = async (req: Request) => {
  const file = req.file as IFileResponse;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.categoryImage = uploadToCloudinary?.secure_url;
  }
  const result = await prisma.productCategory.create({
    data: req.body,
  });
  return result;
};

const getCategories = async (payload: any) => {
  let whereConditions: Prisma.ProductCategoryWhereInput | undefined;
  // Apply filter only if payload.name exists
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

export const categoryServices = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  singleCategory,
};
