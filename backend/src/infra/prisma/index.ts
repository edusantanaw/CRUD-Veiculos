import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const { car, user, supply } = prisma;
export { car, user, prisma, supply };
