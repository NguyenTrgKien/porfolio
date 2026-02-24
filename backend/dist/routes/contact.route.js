"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_controller_1 = __importDefault(require("../controllers/contact.controller"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const contact_schema_1 = require("../validations/contact.schema");
const contacRoute = (router) => {
    router.get("/", () => { });
    router.post("/contact", (0, validate_1.default)(contact_schema_1.contactSchema), contact_controller_1.default.create);
};
exports.default = contacRoute;
