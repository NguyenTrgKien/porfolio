import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e: any) {
      return res.status(400).json({
        error: "Vui lòng truyền đẩy đủ thông tin!",
      });
    }
  };
};

export default validate;
