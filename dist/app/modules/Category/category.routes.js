"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const category_validation_1 = require("./category.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create-category", (0, auth_1.default)(client_1.UserRole.ADMIN), fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = category_validation_1.categoryValidation.createCategory.parse(JSON.parse(req.body.data));
    return category_controller_1.categoryController.createCategory(req, res, next);
});
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.categoryController.getCategories);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.categoryController.updateCategory);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.categoryController.deleteCategory);
exports.CategoryRoutes = router;
