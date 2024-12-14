import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserToDb(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      // needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenfromCookies(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AuthServices.changePassword(req.user, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password Change  successfully",
      data: result,
    });
  }
);

const forgetPassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    await AuthServices.forgetPassword(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Check your email for password reset link",
      data: null,
    });
  }
);

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || " ";
  await AuthServices.resetPassword(token, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "password reset successfully",
    data: null,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
