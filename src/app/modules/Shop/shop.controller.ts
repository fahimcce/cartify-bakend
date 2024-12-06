import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { shopServices } from "./shop.service";
import sendResponse from "../../../shared/sendResponse";

const createShop = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.file);
  const result = await shopServices.createShop(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Shop created successfully !!",
    data: result,
  });
});

const getShops = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.getShops(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Shops retrive SuccessFully",
    data: result.data,
  });
});

const getSingleShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.singleShop(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single Shop Get SuccessFully",
    data: result,
  });
});

const updateShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.updateShop(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Shop updated SuccessFully",
    data: result,
  });
});

const deleteShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.deleteShop(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Shop SuccessFully",
    data: result,
  });
});

export const shopController = {
  createShop,
  getShops,
  getSingleShop,
  updateShop,
  deleteShop,
};
