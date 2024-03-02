import * as dotenv from "dotenv"
import express from "express"
import cors from 'cors'
import { Prisma, PrismaClient } from '@prisma/client'

import { userRouter } from "./users/user.router"


dotenv.config()

if(!process.env.PORT){
    console.log('No PORT Found...');
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)


const prisma = new PrismaClient()

const app = express()

app.use(cors())
app.use(express.json());
app.use("/api/users", userRouter)

app.get("/", (req, res) => {
    res.send(`<h2>Well - Its url: api.blackcommerce.co API on PORT: ${PORT} </h2>`)
})

app.get("/users", async (req, res) => {

  const allUsers = await prisma.user.findMany()

  return res.status(200).json(allUsers)

})

app.post("/users-create", async (req, res) => {
     

    try {
        
        const newUser = await prisma.user.create({data: req.body})

        return res.status(200).json(newUser)

    } catch (error: any) {

        return res.status(500).json(error.message)

    }

})

app.put("/users-update-id/:id", async (req, res) => {
  
    
    try {
        const id = req.params.id;
    
        const existingUser = await prisma.user.update({
            where: { id: parseInt(id) }, 
            data: req.body,
        });

        return res.status(200).json(existingUser)
        
     } catch (error: any) {

        return res.status(500).json(error.message)

    }

    

})

app.delete("/users-delete-id/:id", async (req, res) => {
  
    
    try {
        const id = req.params.id;
    
        const existingUser = await prisma.user.delete({
            where: { id: parseInt(id) }, 
        });
        return res.status(200).json(existingUser)
        
     } catch (error: any) {

        return res.status(500).json(error.message)

    }

})

app.delete("/users-delete-uuid/:uuid", async (req, res) => {
  
    
    try {
        const uuid = req.params.uuid;
    
        const existingUser = await prisma.user.delete({
            where: { uuid: uuid } as Prisma.UserWhereUniqueInput,
            
        });

        return res.status(200).json(existingUser)
        
     } catch (error: any) {

        return res.status(500).json(error.message)

    }

})



app.listen(PORT, () => {
    console.log('Listening on port http://localhost:' + PORT)
});