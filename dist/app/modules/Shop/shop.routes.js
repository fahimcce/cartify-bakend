"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const shop_controller_1 = require("./shop.controller");
const shop_validation_1 = require("./shop.validation");
const router = express_1.default.Router();
router.post("/create-shop", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = shop_validation_1.shopValidation.createShop.parse(JSON.parse(req.body.data));
    return shop_controller_1.shopController.createShop(req, res, next);
});
router.get("/", shop_controller_1.shopController.getShops);
router.get("/:id", 
// auth(UserRole.ADMIN, UserRole.VENDOR),
shop_controller_1.shopController.getSingleShop);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), shop_controller_1.shopController.updateShop);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), shop_controller_1.shopController.deleteShop);
exports.ShopRoutes = router;
