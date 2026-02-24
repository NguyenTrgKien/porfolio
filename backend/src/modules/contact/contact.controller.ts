import { Request, Response } from "express";
import contactService from "./contact.service";

const contactController = {
  create: async (req: Request, res: Response) => {
    try {
      const data = req.body;
      await contactService.create(data);
      res.status(201).json({
        message: "Gửi email thành công!",
      });
    } catch (error) {
      console.log("Lỗi server =============>", error);
      res.status(500).json({
        message: "Lỗi server! Không thể gửi email!",
      });
    }
  },
};

export default contactController;
