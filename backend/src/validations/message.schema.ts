import { z } from "zod";
export const messageSchema = z.object({
  email: z.string().optional(),
  sessionId: z.string().optional(),
  message: z.string().min(1, "Message is required!"),
});
