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
exports.categoryController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const category_service_1 = require("./category.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryServices.createCategory(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category created successfully !!",
        data: result,
    });
}));
const getCategories = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryServices.getCategories(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All categories retrive SuccessFully",
        data: result.data,
    });
}));
const updateCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.params.id);
    const result = yield category_service_1.categoryServices.updateCategory(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Update Category SuccessFully",
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.params.id);
    const result = yield category_service_1.categoryServices.deleteCategory(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Delete Category SuccessFully",
        data: result,
    });
}));
exports.categoryController = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
