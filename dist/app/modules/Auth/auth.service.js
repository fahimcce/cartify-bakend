"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthServices = void 0;
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const emailSender_1 = __importDefault(require("./emailSender"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const loginUserToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("logging in... user...", payload);
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
        },
        include: {
            admin: true,
            vendor: true,
            customer: true,
        },
    });
    let validUser = null;
    // Check which property is not null and assign it to validUser
    if (userData.admin) {
        validUser = userData.admin;
    }
    else if (userData.vendor) {
        validUser = userData.vendor;
    }
    else if (userData.customer) {
        validUser = userData.customer;
    }
    const isPasswordValid = yield bcrypt.compare(payload.password, userData.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.tokenGenerator({
        email: payload.email,
        role: userData.role,
        name: validUser.name,
        id: validUser.id,
        profilePhoto: validUser === null || validUser === void 0 ? void 0 : validUser.profilePhoto,
    }, config_1.default.jwt_access_token, config_1.default.jwt_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.tokenGenerator({
        email: payload.email,
        role: userData.role,
    }, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange,
    };
});
const refreshTokenfromCookies = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt_refresh_token);
    }
    catch (err) {
        throw new Error("Invalid token,So you're not authorized");
    }
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const accessToken = jwtHelpers_1.jwtHelpers.tokenGenerator({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt_access_token, config_1.default.jwt_expires_in);
    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const isPasswordValid = yield bcrypt.compare(payload.oldPassword, userData.password);
    if (!isPasswordValid) {
        throw new Error("Wrong password");
    }
    const hashedPassword = yield bcrypt.hash(payload.newPassword, 12);
    yield prisma_1.default.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false,
        },
    });
    return {
        message: "password changed !!",
    };
});
const forgetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const resetToken = jwtHelpers_1.jwtHelpers.tokenGenerator({ email: userData.email, role: userData.role }, config_1.default.reset_token, config_1.default.reset_expires_in);
    const resetUrl = config_1.default.reset_link + `?userId=${userData.id}&token=${resetToken}`;
    // console.log(resetUrl);
    yield (0, emailSender_1.default)(userData.email, `
    <div>
    <p>Dear User ,</p>
    <p>Your password reset link is below :</p>
    <a href=${resetUrl}>
     <button>Reset password</button>
    
    </a>
    </div>
    `);
    // console.log(resetToken);
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.id,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    // console.log(token);
    const validToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.reset_token);
    // console.log(validToken);
    if (!validToken) {
        throw new ApiError_1.default(401, "forbidden Link");
    }
    const hashedPassword = yield bcrypt.hash(payload.password, 12);
    yield prisma_1.default.user.update({
        where: {
            id: payload.id,
        },
        data: {
            password: hashedPassword,
        },
    });
});
exports.AuthServices = {
    loginUserToDb,
    refreshTokenfromCookies,
    changePassword,
    forgetPassword,
    resetPassword,
};
