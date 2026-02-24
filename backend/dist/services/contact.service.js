"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_config_1 = __importDefault(require("../config/mail.config"));
const contactService = {
    create: async (data) => {
        try {
            const { fullName, email, message } = data;
            await mail_config_1.default.sendMail({
                from: `"Portfolio Contact" ${process.env.MAIL_USER}`,
                to: process.env.MAIL_USER,
                subject: `New contact from ${fullName}`,
                text: `
          Name: ${fullName}
          Email: ${email}
          Message: ${message}
        `,
            });
        }
        catch (error) {
            const err = error;
            throw new Error(err.message);
        }
    },
};
exports.default = contactService;
