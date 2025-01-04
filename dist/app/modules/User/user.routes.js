"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", user_controller_1.userController.getAllUsers);
// router.get(
//   "/me",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
//   userController.getMyProfile
// );
// router.patch(
//   "/:id/status",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
//   // validateRequest(userValidation.statusUpdate),
//   userController.updateStatus
// );
router.post("/create-admin", 
// auth(UserRole.ADMIN),
// validateRequest(userValidation.creatAdmin),
user_controller_1.userController.createAdmin);
router.post("/create-vendor", 
// validateRequest(userValidation.creatVendor),
user_controller_1.userController.createVendor);
router.post("/create-customer", 
// validateRequest(userValidation.creatCustomer),
user_controller_1.userController.createCustomer);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.updateUser);
exports.userRoutes = router;
