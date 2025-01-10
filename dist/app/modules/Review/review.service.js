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
exports.ReviewServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const postReview = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = req.body;
    // Fetch order data
    const orderData = yield prisma_1.default.customer.findUniqueOrThrow({
        where: { id: user === null || user === void 0 ? void 0 : user.id },
        include: {
            orders: {
                include: {
                    orderItems: true,
                },
            },
        },
    });
    // Check if payload.productId exists in any orderItems
    const isProductInOrders = orderData.orders.some((order) => order.orderItems.some((orderItem) => orderItem.productId === payload.productId));
    console.log(isProductInOrders);
    if (!isProductInOrders) {
        throw new Error("Product ID not found in customer's order items.");
    }
    const reviewTable = {
        productId: payload.productId,
        rating: payload.rating,
        review: payload.review,
        customerId: user === null || user === void 0 ? void 0 : user.id,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Create the review
        const createdReview = yield transactionClient.reviews.create({
            data: reviewTable,
        });
        // Create the review-product relationship
        const productReview = yield transactionClient.reviewProducts.create({
            data: {
                productId: payload.productId,
                reviewId: createdReview.id,
            },
        });
        return productReview;
    }));
    return result;
});
exports.ReviewServices = {
    postReview,
};
