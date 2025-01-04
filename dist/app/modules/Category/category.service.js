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
exports.categoryServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const category_constant_1 = require("./category.constant");
const createCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.productCategory.create({
        data: req.body,
    });
    return result;
});
const getCategories = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let whereConditions;
    // Apply filter only if payload.name exists
    if (payload.name) {
        whereConditions = {
            OR: category_constant_1.categorySearchableFields.map((field) => ({
                [field]: {
                    contains: payload.name,
                    mode: "insensitive",
                },
            })),
        };
    }
    const result = yield prisma_1.default.productCategory.findMany({
        where: whereConditions,
    });
    return {
        data: result,
    };
});
const singleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.productCategory.findUniqueOrThrow({
        where: { id },
    });
    return result;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.productCategory.update({
        where: { id },
        data: Object.assign({}, payload),
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.productCategory.delete({
        where: { id },
    });
    return result;
});
exports.categoryServices = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    singleCategory,
};
