import { CreateMessageDTO } from "../../types/message.type";
import prisma from "../../utils/prima";

const messageService = {
  // create: async (data: CreateMessageDTO) => {
  //   try {
  //     const { sessionId, message, email } = data;
  //     if (email) {
  //       const user = await prisma.visitor.findFirst({
  //         where: { email },
  //       });
  //       if (!user) {
  //         throw new Error({ error: "Người dùng không tồn tại!" });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // },
};

export default messageService;
