import transporter from "../../config/mail.config";
import { CreateContactDTO } from "../../types/contact.type";

const contactService = {
  create: async (data: CreateContactDTO) => {
    try {
      const { fullName, email, message } = data;
      await transporter.sendMail({
        from: `"Portfolio Contact" ${process.env.MAIL_USER}`,
        to: process.env.MAIL_USER,
        subject: `New contact from ${fullName}`,
        text: `
          Name: ${fullName}
          Email: ${email}
          Message: ${message}
        `,
      });
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  },
};

export default contactService;
