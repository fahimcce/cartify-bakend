import { Request } from "express";
import prisma from "../../../shared/prisma";

const getMyShop = async (req: Request) => {
  const user = req.user;
  // console.log(user);
  const userData = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
    include: {
      shop: true,
    },
  });

  if (!userData.shop) {
    throw new Error("No shop found for this vendor");
  }

  const { ...shop } = userData.shop;
  return shop;
};

const getMyShopProducts = async (req: Request) => {
  // console.log("clickeds");
  const user = req.user;
  const userData = await prisma.vendor.findUniqueOrThrow({
    where: { email: user?.email },
    include: {
      shop: {
        include: {
          products: true,
        },
      },
    },
  });
  if (!userData.shop) {
    throw new Error("No shop found for this vendor");
  }
  return userData.shop.products;
};

export const vendorServices = {
  getMyShop,
  getMyShopProducts,
};
