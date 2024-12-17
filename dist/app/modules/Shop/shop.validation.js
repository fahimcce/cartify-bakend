"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopValidation = void 0;
const zod_1 = require("zod");
const createShop = zod_1.z.object({
    shopName: zod_1.z.string({ required_error: "shop name is required" }),
    shopLogo: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    //   vendorId: z.string(),
});
exports.shopValidation = {
    createShop,
};
