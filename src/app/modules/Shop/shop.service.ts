import { Request } from "express";
import { IFileResponse } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploaders";
import prisma from "../../../shared/prisma";

import { Prisma } from "@prisma/client";
import { shopSearchableFields } from "./shop.constant";

const createShop = async (req: Request) => {
  // console.log("CLICKED CREATED SHOP");
  const file = req.file as IFileResponse;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.shopLogo = uploadToCloudinary?.secure_url;
  }
  const user = req.user;
  const userData = await prisma.vendor.findUniqueOrThrow({
    where: { email: user?.email },
  });
  req.body.vendorId = userData.id;

  const result = await prisma.shop.create({
    data: req.body,
  });
  return result;
};

const getShops = async (payload: any) => {
  let whereConditions: Prisma.ShopWhereInput | undefined;
  // Apply filter only if payload.shopName exists
  if (payload.shopName) {
    whereConditions = {
      OR: shopSearchableFields.map((field) => ({
        [field]: {
          contains: payload.shopName,
          mode: "insensitive",
        },
      })),
    };
  }
  const result = await prisma.shop.findMany({
    where: whereConditions,
    include: {
      vendor: true,
    },
  });
  return {
    data: result,
  };
};

const singleShop = async (id: string) => {
  const result = await prisma.shop.findUniqueOrThrow({
    where: { id },
  });
  return result;
};
const updateShop = async (id: string, payload: any) => {
  const result = await prisma.shop.update({
    where: { id },
    data: {
      ...payload,
    },
  });
  return result;
};
const deleteShop = async (id: string) => {
  const result = await prisma.shop.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const shopServices = {
  createShop,
  getShops,
  singleShop,
  updateShop,
  deleteShop,
};
