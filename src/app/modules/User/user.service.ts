import { Admin, Customer, UserRole, Vendor } from "@prisma/client";
import { IFileResponse } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploaders";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const createAdminToDB = async (payload: any): Promise<Admin> => {
  //   const file = req.file as IFileResponse;
  //   if (file) {
  //     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  //     req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  //   }
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

const createVendorToDB = async (payload: any): Promise<Vendor> => {
  //   const file = req.file as IFileResponse;
  //   if (file) {
  //     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  //     req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  //   }
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
const createCustomerToDB = async (payload: any): Promise<Customer> => {
  //   const file = req.file as IFileResponse;
  //   if (file) {
  //     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
  //     req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  //   }
  //   console.log("payload :", payload);
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

export const userServices = {
  createAdminToDB,
  createVendorToDB,
  createCustomerToDB,
};
