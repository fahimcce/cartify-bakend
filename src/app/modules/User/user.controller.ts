import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdminToDB(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin create successfully",
    data: result,
  });
});

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createVendorToDB(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor create successfully",
    data: result,
  });
});
const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createCustomerToDB(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "customer create successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.updateUser(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createVendor,
  createCustomer,
  updateUser,
  getAllUsers,
};
