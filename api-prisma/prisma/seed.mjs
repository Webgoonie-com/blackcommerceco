import { PrismaClient } from "@prisma/client"
import { users } from './users.mjs'
import { businesses } from './businesses.mjs'


const prisma = new PrismaClient()


async function main() {


    await prisma.user.createMany({
                data: users,
    })

    await prisma.business.createMany({
        data: businesses,
    })

    
}


main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })