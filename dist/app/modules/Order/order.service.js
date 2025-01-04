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
exports.orderServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrderToDb = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItems, PaymentStatus } = req.body;
    const user = req.user;
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: client_1.UserStatus.ACTIVE,
        },
        include: {
            admin: true,
            vendor: true,
            customer: true,
        },
    });
    let validUser = null;
    // Check which property is not null and assign it to validUser
    if (userData.admin) {
        validUser = userData.admin;
    }
    else if (userData.vendor) {
        validUser = userData.vendor;
    }
    else if (userData.customer) {
        validUser = userData.customer;
    }
    yield prisma_1.default.customer.findUniqueOrThrow({
        where: { id: validUser.id, isDeleted: false },
    });
    // Create the order in a transaction
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Create the main order entry
        const newOrder = yield transactionClient.orders.create({
            data: {
                customerId: validUser.id,
                orderDate: new Date(),
                PaymentStatus,
            },
        });
        // Create order items for the newly created order
        const orderItems = cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            orderId: newOrder.id, // Link order items to the created order
        }));
        // Insert the order items
        yield transactionClient.orderItem.createMany({
            data: orderItems,
        });
        // Update the inventory counts for the products
        for (let item of cartItems) {
            // Ensure inventory count is sufficient before decrementing
            const product = yield transactionClient.products.findUnique({
                where: { id: item.productId },
            });
            if (product && product.inventoryCount >= item.quantity) {
                yield transactionClient.products.update({
                    where: { id: item.productId },
                    data: {
                        inventoryCount: { decrement: item.quantity }, // Decrease inventory count
                    },
                });
            }
            else {
                throw new Error(`Not enough inventory for product ${item.productId}`);
            }
        }
        return newOrder;
    }));
    return result;
});
const getOrdersByAdmin = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.orders.findMany({
        where: { customerId },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });
});
const updateOrderStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderInfo = yield prisma_1.default.orders.update({
        where: { id },
        data: Object.assign({}, payload),
    });
    return orderInfo;
});
const getOrdersByCustomer = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("User is not authenticated");
    }
    const userInfo = yield prisma_1.default.customer.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            orders: {
                include: {
                    orderItems: {
                        include: {
                            product: true,
                        },
                    },
                },
            },
        },
    });
    const result = userInfo.orders;
    return result;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.orders.findMany({
        include: {
            orderItems: true,
        },
    });
    return result;
});
exports.orderServices = {
    createOrderToDb,
    getOrdersByAdmin,
    updateOrderStatus,
    getOrdersByCustomer,
    getAllOrders,
};
