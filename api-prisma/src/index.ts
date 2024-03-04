import * as dotenv from "dotenv"
import express from "express"
import cors from 'cors'

import { userRouter } from "./users/user.router"
import { adminRouter } from "./admins/admin.router"


dotenv.config()

if(!process.env.PORT){
    console.log('No PORT Found...');
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)


const app = express()

app.use(cors())
app.use(express.json());
app.use("/api/users", userRouter)
app.use("/api/admins", adminRouter)

app.get("/", (req, res) => {
    res.send(`<h2>Well - Its url: api.blackcommerce.co API on PORT: ${PORT} </h2>`)
})




app.listen(PORT, () => {
    console.log('Listening on port http://localhost:' + PORT)
});