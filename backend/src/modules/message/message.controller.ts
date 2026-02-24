import { Request, Response } from "express";
import messageService from "./message.service";
import { CreateMessageDTO } from "../../types/message.type";

const messageController = {
  // create: async (req: Request, res: Response) => {
  //   try {
  //     const data = req.body as CreateMessageDTO;
  //     const { email, sessionId } = data;

  //     if (!email && sessionId) {
  //       return res
  //         .status(400)
  //         .json({ message: "Vui lòng truyền đầy đủ thông t in!" });
  //     }

  //     await messageService.create(data);
  //     res.status(201).json({
  //       message: "Gửi tin nhắn thành công!",
  //     });
  //   } catch (error) {
  //     console.log("Lỗi server =============>", error);
  //     const err = error as Error;
  //     res.status(500).json({
  //       error: `Lỗi server: ${err.message} `,
  //     });
  //   }
  // },
};

export default messageController;
