import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { productServices } from "./product.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { productFilterableFields } from "./product.contant";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createProduct(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product created successfully !!",
    data: result,
  });
});

const duplicateProduct = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.params.id,req);
  const result = await productServices.duplicateProduct(req.params.id, req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Duplicate Product created successfully !!",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await productServices.getAllProduct(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products Retrive SuccessFully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productServices.getSingleProduct(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product retrive By ID",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productServices.deleteProduct(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product Deleted SuccessFully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await productServices.updateProduct(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product update Successfully !!",
    data: result,
  });
});

const getFlashSaleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getFlashSaleProduct();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "FlashSale Products Fetched Successfully !!",
    data: result,
  });
});

export const productController = {
  createProduct,
  duplicateProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getFlashSaleProduct,
};
