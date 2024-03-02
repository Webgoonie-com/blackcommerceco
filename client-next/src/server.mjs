import * as dotenv from "dotenv"
import next from "next"
import express from "express"
import WebSocket from "ws"
import cors from 'cors'

dotenv.config()


if(!process.env.PORT){
    console.log('No PORT Found...');
    process.exit(1)
}

const PORT = process.env.PORT || 3303

const dev = process.env.NODE_ENV !== "production"


const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare().then(() => {

    const expressApp = express()
    expressApp.use(cors());

    expressApp.get('*', (req, res) => {
        return handle(req, res)
    })

    expressApp.listen(PORT, () => {
        
        console.log(`PORT Listening on http://localhost:${PORT}`);
    });

    //const wss = new WebSocket.Server({ server })
    

})