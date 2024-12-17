import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { vendorServices } from "./vendor.service";

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const result = await vendorServices.getMyShop(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My Shop Get SuccessFully",
    data: result,
  });
});

const getMyShopProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await vendorServices.getMyShopProducts(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My Shop Products Get SuccessFully",
    data: result,
  });
});

export const vendorController = {
  getMyShop,
  getMyShopProducts,
};
