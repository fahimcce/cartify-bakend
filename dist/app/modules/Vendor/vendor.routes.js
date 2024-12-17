"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const vendor_controller_1 = require("./vendor.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/my-shop", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), vendor_controller_1.vendorController.getMyShop);
router.get("/my-shop-products", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), vendor_controller_1.vendorController.getMyShopProducts);
exports.VendorRoutes = router;
