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
exports.productServices = void 0;
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const product_contant_1 = require("./product.contant");
const createProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // console.log("Create PRoduct CLICK");
    const file = req.file;
    const userData = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: { email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email },
        include: {
            shop: true,
        },
    });
    console.log();
    req.body.shopId = (_b = userData.shop) === null || _b === void 0 ? void 0 : _b.id;
    //Handle file upload
    if (file) {
        const uploadToCloudinary = yield fileUploaders_1.fileUploader.uploadToCloudinary(file);
        req.body.images = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const shopData = yield prisma_1.default.shop.findUniqueOrThrow({
        where: { id: req.body.shopId },
    });
    if (!shopData) {
        throw new Error("Shop id is not valid");
    }
    // console.log(req.body);
    //Create the product
    const result = yield prisma_1.default.products.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            inventoryCount: req.body.inventoryCount,
            images: req.body.images,
            price: req.body.price,
            shopId: req.body.shopId,
        },
    });
    return result;
});
const duplicateProduct = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    // Fetch the product by ID
    const product = yield prisma_1.default.products.findUnique({
        where: { id },
    });
    console.log(product);
    if (!product)
        throw new Error("Product not found");
    // Create a duplicate product with updated or original data
    const newProduct = yield prisma_1.default.products.create({
        data: {
            name: payload.name || product.name,
            images: product.images || null,
            description: payload.description || product.description,
            price: payload.price || product.price,
            inventoryCount: payload.inventoryCount || product.inventoryCount,
            discount: payload.discount || product.discount,
            shopId: payload.shopId || product.shopId,
        },
    });
    return newProduct;
});
const getAllProduct = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(options);
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: product_contant_1.productFilterableFields.map((field) => ({
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
    const result = yield prisma_1.default.products.findMany({
        where: whereConditions,
        include: { shop: true },
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
    const total = yield prisma_1.default.products.count({
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
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.products.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            shop: true,
        },
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.products.delete({
        where: { id },
    });
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categories } = payload, productData = __rest(payload, ["categories"]);
    // console.log("categories:", categories);
    // console.log("Product Data:", productData);
    const productInfo = yield prisma_1.default.products.findUniqueOrThrow({
        where: { id },
    });
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const updateProduct = yield transactionClient.products.update({
            where: { id },
            data: Object.assign({}, productData),
            include: {
                categories: true,
            },
        });
        if (categories && categories.length > 0) {
            const deleteFilterProduct = categories.filter((category) => category.isDeleted);
            for (const categoryId of deleteFilterProduct) {
                yield transactionClient.categories.deleteMany({
                    where: {
                        productId: productInfo.id,
                        categoryId: categoryId.categoryId,
                    },
                });
            }
            const createProductFilter = categories.filter((category) => !category.isDeleted);
            for (const categoryId of createProductFilter) {
                yield transactionClient.categories.create({
                    data: {
                        productId: productInfo.id,
                        categoryId: categoryId.categoryId,
                    },
                });
            }
        }
    }));
    const result = yield prisma_1.default.products.findUnique({
        where: {
            id: productInfo.id,
        },
        include: {
            categories: {
                include: {
                    productCategory: true,
                },
            },
        },
    });
    return result;
});
exports.productServices = {
    createProduct,
    duplicateProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
};
