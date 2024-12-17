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
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrderToDb = (customerId, cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure customer exists and is not deleted
    yield prisma_1.default.customer.findUniqueOrThrow({
        where: { id: customerId, isDeleted: false },
    });
    // Create the order in a transaction
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Create the main order entry
        const newOrder = yield transactionClient.orders.create({
            data: {
                customerId,
                orderDate: new Date(),
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
    // Fetch the customer's information based on their email
    const userInfo = yield prisma_1.default.customer.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    // Ensure the `id` belongs to the authenticated user
    if (userInfo.id !== id) {
        throw new Error("Unauthorized access to customer orders");
    }
    // Fetch the orders for the given customer ID
    const orders = yield prisma_1.default.orders.findMany({
        where: {
            customerId: id,
        },
    });
    // console.log(orders);
    return orders;
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
