"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const category_routes_1 = require("../modules/Category/category.routes");
const shop_routes_1 = require("../modules/Shop/shop.routes");
const product_routes_1 = require("../modules/Product/product.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const order_routes_1 = require("../modules/Order/order.routes");
const vendor_routes_1 = require("../modules/Vendor/vendor.routes");
const review_routes_1 = require("../modules/Review/review.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/category",
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: "/shops",
        route: shop_routes_1.ShopRoutes,
    },
    {
        path: "/products",
        route: product_routes_1.ProductRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.OrderRoutes,
    },
    {
        path: "/vendor",
        route: vendor_routes_1.VendorRoutes,
    },
    {
        path: "/review",
        route: review_routes_1.ReviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
