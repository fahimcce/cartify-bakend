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
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const shop_constant_1 = require("./shop.constant");
const createShop = (req) => __awaiter(void 0, void 0, void 0, function* () {
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
        where: Object.assign(Object.assign({}, (whereConditions || {})), { isDeleted: false }),
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
        include: {
            products: true,
        },
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
const followShop = (customerId, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const preFollowChk = yield prisma_1.default.customerFollowsShop.findUnique({
        where: {
            customerId_shopId: {
                customerId,
                shopId,
            },
        },
    });
    const followerFind = yield prisma_1.default.shop.findUniqueOrThrow({
        where: { id: shopId },
    });
    let follower = followerFind.follower;
    if (!preFollowChk) {
        follower++;
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.customerFollowsShop.create({
                data: {
                    customerId,
                    shopId,
                },
            });
            const FollowerUpdate = yield transactionClient.shop.update({
                where: {
                    id: shopId,
                },
                data: {
                    follower: follower,
                },
            });
            return FollowerUpdate;
        }));
        return result;
    }
    else {
        throw new Error("Already Followed");
    }
});
const unfollowShop = (customerId, shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const isFollowed = yield prisma_1.default.customerFollowsShop.findUnique({
        where: {
            customerId_shopId: {
                customerId,
                shopId,
            },
        },
    });
    const followerFind = yield prisma_1.default.shop.findUniqueOrThrow({
        where: { id: shopId },
    });
    let follower = followerFind.follower;
    if (isFollowed) {
        follower--;
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.customerFollowsShop.delete({
                where: {
                    customerId_shopId: {
                        customerId,
                        shopId,
                    },
                },
            });
            const FollowerUpdate = yield transactionClient.shop.update({
                where: {
                    id: shopId,
                },
                data: {
                    follower: follower,
                },
            });
            return FollowerUpdate;
        }));
        return result;
    }
    else {
        const message = "Follow first then unfollow";
        return message;
    }
});
const getFollowedShops = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customerFollowsShop.findMany({
        where: { customerId },
        include: {
            shop: true,
        },
    });
    return result.map((follow) => follow.shop);
});
exports.shopServices = {
    createShop,
    getShops,
    singleShop,
    updateShop,
    deleteShop,
    followShop,
    unfollowShop,
    getFollowedShops,
};
