import { PrismaClient } from '@prisma/client'

let orm: PrismaClient

declare global {
    var __orm: PrismaClient | undefined
}

if (!global.__orm) {
    global.__orm = new PrismaClient()
}

orm = global.__orm

export { orm }