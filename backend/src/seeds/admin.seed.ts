import bcrypt from "bcrypt";
import prisma from "../utils/prima";

const seedAdmin = async () => {
  const existing = await prisma.user.findFirst();
  if (existing) return;

  const hashedPassword = await bcrypt.hash("kiendz1199", 10);
  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log("Admin created: admin@gmail.com / admin123");
};

export default seedAdmin;
