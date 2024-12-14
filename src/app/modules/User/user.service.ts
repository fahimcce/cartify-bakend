import { Admin, Customer, UserRole, Vendor } from "@prisma/client";
import { IFileResponse } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploaders";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const createAdminToDB = async (req: Request): Promise<Admin> => {
  const payload = req.body;
  const file = req.file as IFileResponse;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }
  //   console.log("payload :", payload);
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

const createVendorToDB = async (req: Request): Promise<Vendor> => {
  const payload = req.body;
  const file = req.file as IFileResponse;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.vendor.profilePhoto = uploadToCloudinary?.secure_url;
  }
  //   console.log("payload :", payload);
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
const createCustomerToDB = async (req: Request) => {
  const payload = req.body;

  const file = req.file as IFileResponse;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.customer.profilePhoto = uploadToCloudinary?.secure_url;
  }

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

const updateUser = async (id: string, payload: any) => {
  // console.log(payload);
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

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const userServices = {
  createAdminToDB,
  createVendorToDB,
  createCustomerToDB,
  updateUser,
  getAllUsers,
};
