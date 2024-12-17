"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Route to create an order
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.ADMIN), order_controller_1.orderControllers.createOrderByCustomer);
//get all orders  by Admin
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), order_controller_1.orderControllers.getAllOrders);
//get orders any customer by Admin
router.get("/:customerId", (0, auth_1.default)(client_1.UserRole.ADMIN), order_controller_1.orderControllers.getOrdersByAdmin);
// orders get by single customer
router.get("/my-orders/:id", (0, auth_1.default)(client_1.UserRole.CUSTOMER), order_controller_1.orderControllers.getOrdersByCustomer);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), order_controller_1.orderControllers.updateOrderStatus);
exports.OrderRoutes = router;
