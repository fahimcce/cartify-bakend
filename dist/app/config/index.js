"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    reset_token: process.env.RESET_TOKEN,
    reset_expires_in: process.env.RESET_EXPIRES_IN,
    reset_link: process.env.RESET_LINK,
    sender_mail: process.env.MAIL_SENDER_EMAIL,
    sender_password: process.env.MAIL_SENDER_PASSWORD,
};