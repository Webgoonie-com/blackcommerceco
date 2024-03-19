import { PrismaClient as Prisma } from "@prisma/client";

// Exporting PrismaClient as orm
export { Prisma as orm };

// Declare global prisma instance
declare global {
  var prisma: Prisma | undefined;
}

// Initialize PrismaClient
const prisma = new Prisma();

// Assign PrismaClient to globalThis if not in production
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Export Prisma instance by default
export default prisma;
