"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("../middlewares/validate"));
const message_schema_1 = require("../validations/message.schema");
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const messageRoute = (router) => {
    router.post("/messages", (0, validate_1.default)(message_schema_1.messageSchema), message_controller_1.default.create);
};
exports.default = messageRoute;
