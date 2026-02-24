"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routerInit_route_1 = __importDefault(require("./routes/routerInit.route"));
const db_config_1 = require("./config/db.config");
const app = (0, express_1.default)();
const port = 8080;
const corsOption = {
    origin: ["http://localhost:5173"],
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, routerInit_route_1.default)(app);
db_config_1.pool
    .query("SELECT NOW()")
    .then(() => console.log("Postgres connected"))
    .catch((err) => console.error("DB error:", err));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
