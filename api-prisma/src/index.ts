import * as dotenv from "dotenv"
import express, { Request, Response } from "express";
import path from 'path'
import cors from 'cors'

import { adminRouter } from "./admins/admin.router"
import { businessRouter } from "./businesses/business.router"
import { generalRouter } from "./general/general.route";
import { favoriteRouter } from "./favorites/favorite.router";
import { listingRouter } from "./listings/listing.router"
import  { reservationRouter } from './reservations/reservation.router'
import { propertyRouter } from "./propertys/property.router"
import { userRouter } from "./users/user.router"


dotenv.config()

if(!process.env.PORT){
    console.log('No PORT Found...');
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

const MIME_TYPE_MAP: { [key: string]: string } = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp'
};

// Set Up Public folder
app.use(express.static('./public'))

//app.use(express.static(path.join(__dirname, 'public', 'uploaded')));

app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/users", userRouter)
app.use("/api/admins", adminRouter)
app.use("/api/businesses", businessRouter)
app.use("/api/favorites", favoriteRouter)
app.use("/api/generals", generalRouter)
app.use("/api/propertys", propertyRouter)
app.use("/api/listings", listingRouter)
app.use("/api/reservations", reservationRouter)

app.use(express.static('public', {
    setHeaders: (res: Response, _path: string, _stat: any) => { // Type the parameters properly
        const fileExt = path.extname(_path).toLowerCase();
        const mimeType = MIME_TYPE_MAP[fileExt];
        if (mimeType) {
          res.setHeader('Content-Type', mimeType);
        }
      }
}));

app.get("/", (req: Request, res: Response) => {
    res.send(`<h2>Well - Its url: api.blackcommerce.co API on PORT: ${PORT} </h2>`)
})




app.listen(PORT, () => {
    console.log('Listening on port http://localhost:' + PORT)
});