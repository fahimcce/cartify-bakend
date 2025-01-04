import { Request } from "express";
import prisma from "../../../shared/prisma";

import { Prisma } from "@prisma/client";
import { shopSearchableFields } from "./shop.constant";

const createShop = async (req: Request) => {
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
    where: {
      ...(whereConditions || {}),
      isDeleted: false,
    },
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
    include: {
      products: true,
    },
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

const followShop = async (customerId: string, shopId: string) => {
  const preFollowChk = await prisma.customerFollowsShop.findUnique({
    where: {
      customerId_shopId: {
        customerId,
        shopId,
      },
    },
  });
  const followerFind = await prisma.shop.findUniqueOrThrow({
    where: { id: shopId },
  });
  let follower = followerFind.follower;
  if (!preFollowChk) {
    follower++;
    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.customerFollowsShop.create({
        data: {
          customerId,
          shopId,
        },
      });
      const FollowerUpdate = await transactionClient.shop.update({
        where: {
          id: shopId,
        },
        data: {
          follower: follower,
        },
      });
      return FollowerUpdate;
    });
    return result;
  } else {
    throw new Error("Already Followed");
  }
};

const unfollowShop = async (customerId: string, shopId: string) => {
  const isFollowed = await prisma.customerFollowsShop.findUnique({
    where: {
      customerId_shopId: {
        customerId,
        shopId,
      },
    },
  });
  const followerFind = await prisma.shop.findUniqueOrThrow({
    where: { id: shopId },
  });
  let follower = followerFind.follower;
  if (isFollowed) {
    follower--;
    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.customerFollowsShop.delete({
        where: {
          customerId_shopId: {
            customerId,
            shopId,
          },
        },
      });
      const FollowerUpdate = await transactionClient.shop.update({
        where: {
          id: shopId,
        },
        data: {
          follower: follower,
        },
      });
      return FollowerUpdate;
    });
    return result;
  } else {
    const message = "Follow first then unfollow";
    return message;
  }
};

const getFollowedShops = async (customerId: string) => {
  const result = await prisma.customerFollowsShop.findMany({
    where: { customerId },
    include: {
      shop: true,
    },
  });
  return result.map((follow) => follow.shop);
};

export const shopServices = {
  createShop,
  getShops,
  singleShop,
  updateShop,
  deleteShop,
  followShop,
  unfollowShop,
  getFollowedShops,
};
