import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { adminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await adminService.getAllAdminFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Admin Retrive SuccessFully",
    meta: result.meta,
    data: result.data,
  });
});

// const getSingleAdminById = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const result = await adminService.getSingleAdminFromDB(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Single Admin retrive By ID",
//     data: result,
//   });
// });

const updateSingleAdminById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await adminService.updateAdminToDb(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin Update SuccessFully !!",
      data: result,
    });
  }
);

// const deleteSingleAdminById = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     const result = await adminService.deleteAdminFromDb(id);
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Admin Delete SuccessFully !!",
//       data: result,
//     });
//   }
// );

// const softDeleteSingleAdminById = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;

//     const result = await adminService.softDeleteAdminFromDb(id);
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Admin soft Delete SuccessFully !!",
//       data: result,
//     });
//   }
// );

export const adminController = {
  getAllAdmin,
  //   getSingleAdminById,
  updateSingleAdminById,
  //   deleteSingleAdminById,
  //   softDeleteSingleAdminById,
};
