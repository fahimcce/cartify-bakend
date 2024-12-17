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
const fileUploaders_1 = require("../../../helpers/fileUploaders");
const user_validation_1 = require("./user.validation");
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
fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.creatAdmin.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createAdmin(req, res, next);
});
router.post("/create-vendor", 
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.creatVendor.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createVendor(req, res, next);
});
router.post("/create-customer", fileUploaders_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = user_validation_1.userValidation.creatCustomer.parse(JSON.parse(req.body.data));
    return user_controller_1.userController.createCustomer(req, res, next);
});
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userController.updateUser);
// router.patch(
//   "/update-profile",
//   auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
//   fileUploader.upload.single("file"),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     return userController.updateMyProfile(req, res, next);
//   }
// );
exports.userRoutes = router;
