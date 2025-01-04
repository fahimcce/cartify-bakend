"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const creatAdmin = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "password is required",
    }),
    admin: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
        profilePhoto: zod_1.z.string().optional(),
    }),
});
const creatVendor = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "password is required",
    }),
    vendor: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
        profilePhoto: zod_1.z.string().optional(),
    }),
});
const creatCustomer = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "password is required",
    }),
    customer: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
        profilePhoto: zod_1.z.string().optional(),
    }),
});
exports.userValidation = {
    creatAdmin,
    creatVendor,
    creatCustomer,
};
