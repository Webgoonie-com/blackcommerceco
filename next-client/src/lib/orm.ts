import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
};

export const orm = new PrismaClient();

//if (process.env.NODE_ENV !== "production") globalThis.prisma = orm

export default orm