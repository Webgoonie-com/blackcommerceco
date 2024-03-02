import express from "express"
import { Prisma, PrismaClient } from '@prisma/client'

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
     

    try {
        
        const newUser = await prisma.user.create({data: req.body})

        return res.json(newUser)

    } catch (error) {

        return res.status(501).json({error})

    }

})

app.put("/users-update-id/:id", async (req, res) => {
  
    
    try {
        const id = req.params.id;
    
        const existingUser = await prisma.user.update({
            where: { id: parseInt(id) }, 
            data: req.body,
        });
        return res.json(existingUser)
        
    } catch (error) {
        return res.status(501).json({error})
    }

    

})

app.delete("/users-delete-id/:id", async (req, res) => {
  
    
    try {
        const id = req.params.id;
    
        const existingUser = await prisma.user.delete({
            where: { id: parseInt(id) }, 
        });
        return res.json(existingUser)
        
    } catch (error) {
        return res.status(501).json({error})
    }

})

app.delete("/users-delete-uuid/:uuid", async (req, res) => {
  
    
    try {
        const uuid = req.params.uuid;
    
        const existingUser = await prisma.user.delete({
            where: { uuid: uuid } as Prisma.UserWhereUniqueInput,
            
        });

        return res.json(existingUser)
        
    } catch (error) {
        return res.status(501).json({error})
    }

})



app.listen(PORT, () => {
    console.log('Listening on port http://localhost:' + PORT)
});