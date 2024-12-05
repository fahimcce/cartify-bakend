import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userServices.createAdminToDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin create successfully",
    data: result,
  });
});

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userServices.createVendorToDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor create successfully",
    data: result,
  });
});
const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userServices.createCustomerToDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "customer create successfully",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createVendor,
  createCustomer,
};
