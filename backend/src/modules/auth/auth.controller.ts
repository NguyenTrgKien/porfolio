import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prima";
import * as bcrypt from "bcrypt";

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const admin = await prisma.admin.findFirst({ where: { email } });

      if (!admin) {
        res.status(401).json({ message: "Email or password is incorrect" });
        return;
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        res.status(401).json({ message: "Email or password is incorrect" });
        return;
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" },
      );

      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: "Login successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getMe: async (req: Request, res: Response) => {
    try {
      res.json({ data: (req as any).user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default authController;
