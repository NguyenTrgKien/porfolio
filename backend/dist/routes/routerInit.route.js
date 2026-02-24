"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_route_1 = __importDefault(require("./contact.route"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const routerInit = (app) => {
    (0, contact_route_1.default)(router);
    return app.use("/api/v1/", router);
};
exports.default = routerInit;
