"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const createProduct = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Product name is required" }),
    description: zod_1.z.string({ required_error: "Description is required" }),
    inventoryCount: zod_1.z.number().optional(), // Optional if not always provided
    images: zod_1.z.string().optional(),
    discount: zod_1.z.number().optional(),
});
exports.productValidation = { createProduct };
