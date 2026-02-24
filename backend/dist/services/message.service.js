"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const messageService = {
    create: async (data) => {
        try {
            const { sessionId, message, email } = data;
            if (email) {
                // const user = await prisma.user.;s
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },
};
exports.default = messageService;
