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
exports.shopController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const shop_service_1 = require("./shop.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createShop = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.file);
    const result = yield shop_service_1.shopServices.createShop(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop created successfully !!",
        data: result,
    });
}));
const getShops = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.shopServices.getShops(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All Shops retrive SuccessFully",
        data: result.data,
    });
}));
const getSingleShop = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.shopServices.singleShop(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Single Shop Get SuccessFully",
        data: result,
    });
}));
const updateShop = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.shopServices.updateShop(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop updated SuccessFully",
        data: result,
    });
}));
const deleteShop = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_service_1.shopServices.deleteShop(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Delete Shop SuccessFully",
        data: result,
    });
}));
exports.shopController = {
    createShop,
    getShops,
    getSingleShop,
    updateShop,
    deleteShop,
};
