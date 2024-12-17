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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const admin_constant_1 = require("./admin.constant");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllAdminFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(options);
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: admin_constant_1.adminSearchableFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    andConditions.push({
        isDeleted: false,
    });
    const whereConditions = {
        AND: andConditions,
    };
    const result = yield prisma_1.default.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.admin.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// const getSingleAdminFromDB = async (id: string): Promise<Admin | null> => {
//   const result = await prisma.admin.findUnique({
//     where: {
//       id,
//       isDeleted: false,
//     },
//   });
//   return result;
// };
const updateAdminToDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.admin.findUniqueOrThrow({
        where: { id, isDeleted: false },
    });
    const result = yield prisma_1.default.admin.update({
        where: { id },
        data,
    });
    return result;
});
// const deleteAdminFromDb = async (id: string): Promise<Admin | null> => {
//   await prisma.admin.findUniqueOrThrow({
//     where: { id },
//   });
//   const result = await prisma.$transaction(async (transactionClient) => {
//     const deleteFromAdmin = await transactionClient.admin.delete({
//       where: { id },
//     });
//     await transactionClient.user.delete({
//       where: {
//         email: deleteFromAdmin.email,
//       },
//     });
//     return deleteFromAdmin;
//   });
//   return result;
// };
// const softDeleteAdminFromDb = async (id: string): Promise<Admin | null> => {
//   await prisma.admin.findUniqueOrThrow({
//     where: { id, isDeleted: false },
//   });
//   const result = await prisma.$transaction(async (transactionClient) => {
//     const deleteFromAdmin = await transactionClient.admin.update({
//       where: { id },
//       data: {
//         isDeleted: true,
//       },
//     });
//     await transactionClient.user.update({
//       where: {
//         email: deleteFromAdmin.email,
//       },
//       data: {
//         status: UserStatus.DELETED,
//       },
//     });
//     return deleteFromAdmin;
//   });
//   return result;
// };
const shopRestriction = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.update({
        where: { id },
        data: Object.assign({}, data),
    });
    return result;
});
exports.adminService = {
    getAllAdminFromDB,
    //   getSingleAdminFromDB,
    updateAdminToDb,
    shopRestriction,
    //   deleteAdminFromDb,
    //   softDeleteAdminFromDb,
};
