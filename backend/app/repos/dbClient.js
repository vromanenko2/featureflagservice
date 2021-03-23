import prismaClientPkg from "@prisma/client";
const { PrismaClient } = prismaClientPkg;
const dbClient = new PrismaClient()

export { dbClient };