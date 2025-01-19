import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReviewServices } from "./review.service";

const postReview = catchAsync(async (req: Request, res: Response) => {
  const review = await ReviewServices.postReview(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review Gived successfully!",
    data: review,
  });
});
const productReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.productReview(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Prodcuts Review fetched successfully!",
    data: result,
  });
});

export const ReviewController = {
  postReview,
  productReview,
};
