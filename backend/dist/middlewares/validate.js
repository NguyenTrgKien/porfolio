"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (e) {
            return res.status(400).json({
                error: "Vui lòng truyền đẩy đủ thông tin!",
            });
        }
    };
};
exports.default = validate;
