import { Admin, Customer, UserRole, Vendor } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const createAdminToDB = async (payload: any): Promise<Admin> => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createAdminData = await transactionClient.admin.create({
      data: payload.admin,
    });
    return createAdminData;
  });
  return result;
};

const createVendorToDB = async (payload: any): Promise<Vendor> => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload.vendor.email,
    password: hashedPassword,
    role: UserRole.VENDOR,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createVendorData = await transactionClient.vendor.create({
      data: payload.vendor,
    });
    return createVendorData;
  });
  return result;
};
const createCustomerToDB = async (payload: any): Promise<Customer> => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  const userData = {
    email: payload.customer.email,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createCustomerData = await transactionClient.customer.create({
      data: payload.customer,
    });
    return createCustomerData;
  });
  return result;
};

const updateUser = async (req: Request) => {
  const user = req.user;
  const payload = req.body;
  if (!user) throw new Error("User Not found");
  else if (user.role == "ADMIN") {
    const result = await prisma.admin.update({
      where: {
        id: user.id,
      },
      data: {
        ...payload,
      },
    });
    return result;
  } else if (user.role == "CUSTOMER") {
    const result = await prisma.customer.update({
      where: {
        id: user.id,
      },
      data: {
        ...payload,
      },
    });
    return result;
  } else {
    const result = await prisma.vendor.update({
      where: {
        id: user.id,
      },
      data: {
        ...payload,
      },
    });
    return result;
  }
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
const myProfile = async (req: Request) => {
  const user = req.user;
  if (!user) throw new Error("User Not found");

  if (user.role == "ADMIN") {
    const result = await prisma.admin.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });
    return result;
  }
  if (user.role == "CUSTOMER") {
    const result = await prisma.customer.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });
    return result;
  } else {
    const result = await prisma.vendor.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });
    return result;
  }
};

const updateUserToDB = async (id: string, payload: any) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return user;
};

export const userServices = {
  createAdminToDB,
  createVendorToDB,
  createCustomerToDB,
  updateUser,
  getAllUsers,
  myProfile,
  updateUserToDB,
};
