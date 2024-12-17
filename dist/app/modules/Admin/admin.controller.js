"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const pick_1 = __importDefault(require("../../../shared/pick"));
const admin_constant_1 = require("./admin.constant");
const admin_service_1 = require("./admin.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const getAllAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, admin_constant_1.adminFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield admin_service_1.adminService.getAllAdminFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All Admin Retrive SuccessFully",
        meta: result.meta,
        data: result.data,
    });
}));
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
const updateSingleAdminById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.updateAdminToDb(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin Update SuccessFully !!",
        data: result,
    });
}));
const shopRestriction = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.adminService.shopRestriction(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop is restricted!!",
        data: result,
    });
}));
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
exports.adminController = {
    getAllAdmin,
    //   getSingleAdminById,
    updateSingleAdminById,
    shopRestriction,
    //   deleteSingleAdminById,
    //   softDeleteSingleAdminById,
};
