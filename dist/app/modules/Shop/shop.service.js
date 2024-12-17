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
exports.shopServices = void 0;
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const shop_constant_1 = require("./shop.constant");
const createShop = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("CLICKED CREATED SHOP");
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.shopLogo = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const user = req.user;
    const userData = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
    });
    req.body.vendorId = userData.id;
    const result = yield prisma_1.default.shop.create({
        data: req.body,
    });
    return result;
});
const getShops = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let whereConditions;
    // Apply filter only if payload.shopName exists
    if (payload.shopName) {
        whereConditions = {
            OR: shop_constant_1.shopSearchableFields.map((field) => ({
                [field]: {
                    contains: payload.shopName,
                    mode: "insensitive",
                },
            })),
        };
    }
    const result = yield prisma_1.default.shop.findMany({
        where: whereConditions,
        include: {
            vendor: true,
        },
    });
    return {
        data: result,
    };
});
const singleShop = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.findUniqueOrThrow({
        where: { id },
    });
    return result;
});
const updateShop = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.update({
        where: { id },
        data: Object.assign({}, payload),
    });
    return result;
});
const deleteShop = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.update({
        where: { id },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.shopServices = {
    createShop,
    getShops,
    singleShop,
    updateShop,
    deleteShop,
};
