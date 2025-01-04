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

export const ReviewController = {
  postReview,
};
