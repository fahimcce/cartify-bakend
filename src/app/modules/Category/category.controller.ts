import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { categoryServices } from "./category.service";
import sendResponse from "../../../shared/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  console.log(req?.user);
  const result = await categoryServices.createCategory(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully !!",
    data: result,
  });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getCategories(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All categories retrive SuccessFully",
    data: result.data,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.params.id);
  const result = await categoryServices.updateCategory(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update Category SuccessFully",
    data: result,
  });
});

const getCategoryProducts = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryServices.getCategoryProducts(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Based Products retrive SuccessFully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.params.id);
  const result = await categoryServices.deleteCategory(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Category SuccessFully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
};
