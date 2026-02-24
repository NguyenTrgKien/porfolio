"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_service_1 = __importDefault(require("../services/message.service"));
const messageController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            const { email, sessionId } = data;
            if (!email && sessionId) {
                return res
                    .status(400)
                    .json({ message: "Vui lòng truyền đầy đủ thông tin!" });
            }
            await message_service_1.default.create(data);
            res.status(201).json({
                message: "Gửi tin nhắn thành công!",
            });
        }
        catch (error) {
            console.log("Lỗi server =============>", error);
            const err = error;
            res.status(500).json({
                error: `Lỗi server: ${err.message} `,
            });
        }
    },
};
exports.default = messageController;
