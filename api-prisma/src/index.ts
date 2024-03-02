import express from "express"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
const PORT = 3009;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h2>Hello's NODE Dev </h2>")
})

app.get("/users", async (req, res) => {

  const allUsers = await prisma.user.findMany()

  return res.json(allUsers)

})

app.post("/users-create", async (req, res) => {
  
    // req.body = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     hashedPassword: req.body.hashedPassword,
    // }

    const newUser = await prisma.user.create({data: req.body})

    return res.json(newUser)

})



app.listen(PORT, () => {
    console.log('Listening on port http://localhost:' + PORT)
});