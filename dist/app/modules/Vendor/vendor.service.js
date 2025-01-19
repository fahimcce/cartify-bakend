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
exports.vendorServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getMyShop = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    const userData = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        include: {
            shop: true,
        },
    });
    if (!userData.shop) {
        throw new Error("No shop found for this vendor");
    }
    const shop = __rest(userData.shop, []);
    return shop;
});
const getMyShopProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userData = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
        include: {
            shop: {
                include: {
                    products: {
                        where: { isDeleted: false }, // Filter products where isDeleted is false
                    },
                },
            },
        },
    });
    if (!userData.shop) {
        throw new Error("No shop found for this vendor");
    }
    return userData.shop.products;
});
exports.vendorServices = {
    getMyShop,
    getMyShopProducts,
};
