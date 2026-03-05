// import { PrismaClient } from "../generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// const prisma = new PrismaClient({ adapter });
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
