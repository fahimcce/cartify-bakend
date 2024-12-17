"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.adminController.getAllAdmin);
// router.get(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.getSingleAdminById
// );
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(admin_validation_1.adminValidationsSchemas.update), admin_controller_1.adminController.updateSingleAdminById);
router.patch("/restricted/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), admin_controller_1.adminController.shopRestriction);
// router.delete(
//   "/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.deleteSingleAdminById
// );
// router.patch(
//   "/soft/:id",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   adminController.softDeleteSingleAdminById
// );
exports.AdminRoutes = router;
