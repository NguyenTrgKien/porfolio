import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(1, "Name is required!"),
  email: z.string().email("Email is required!"),
  message: z.string().min(1, "Message is required!"),
});
