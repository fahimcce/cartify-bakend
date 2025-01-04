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
exports.orderControllers = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
// Controller to create an order
const createOrderByCustomer = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderServices.createOrderToDb(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order placed successfully!",
        data: order,
    });
}));
// Controller to get orders by Admin
const getOrdersByAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params; // Get customer ID from the params
    const orders = yield order_service_1.orderServices.getOrdersByAdmin(customerId);
    // Send success response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Orders fetched successfully",
        data: orders,
    });
}));
// Controller to get orders by Admin
const getOrdersByCustomer = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const orders = yield order_service_1.orderServices.getOrdersByCustomer(id, req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Your all order fetch successfully",
        data: orders,
    });
}));
// get All orders by Admin
const getAllOrders = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.orderServices.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All orders fetch successfully",
        data: orders,
    });
}));
// Controller to get orders by customer
const updateOrderStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get customer ID from the params
    const orders = yield order_service_1.orderServices.updateOrderStatus(id, req.body);
    // Send success response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order Status Updated successfully",
        data: orders,
    });
}));
exports.orderControllers = {
    createOrderByCustomer,
    getOrdersByAdmin,
    updateOrderStatus,
    getOrdersByCustomer,
    getAllOrders,
};
