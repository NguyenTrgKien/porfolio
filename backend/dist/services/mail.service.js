"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const mail_config_1 = __importDefault(require("../config/mail.config"));
exports.mailService = {
    sendMail: async (from, fullName, subject, text) => {
        await mail_config_1.default.sendMail({
            from: `${fullName} <${from}>`,
            to: process.env.MAIL_USER,
            subject,
            text,
        });
    },
};
