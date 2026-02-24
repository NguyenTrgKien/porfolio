"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_service_1 = __importDefault(require("../services/contact.service"));
const contactController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            await contact_service_1.default.create(data);
            res.status(201).json({
                message: "Gửi email thành công!",
            });
        }
        catch (error) {
            console.log("Lỗi server =============>", error);
            res.status(500).json({
                message: "Lỗi server! Không thể gửi email!",
            });
        }
    },
};
exports.default = contactController;
