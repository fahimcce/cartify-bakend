"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/create-product", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return product_controller_1.productController.createProduct(req, res, next);
});
router.post("/create-duplicate-product/:id", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), product_controller_1.productController.duplicateProduct);
router.get("/", product_controller_1.productController.getAllProduct);
router.get("/:id", product_controller_1.productController.getSingleProduct);
router.delete("/:id", product_controller_1.productController.deleteProduct);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), 
// validateRequest(adminValidationsSchemas.update),
product_controller_1.productController.updateProduct);
exports.ProductRoutes = router;
