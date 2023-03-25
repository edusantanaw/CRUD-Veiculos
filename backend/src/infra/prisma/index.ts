 import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const {car, user} = prisma
export {car, user, prisma}