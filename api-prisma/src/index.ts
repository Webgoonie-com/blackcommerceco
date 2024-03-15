import * as dotenv from "dotenv"
import express from "express"
import path from 'path'
import cors from 'cors'

import { userRouter } from "./users/user.router"
import { adminRouter } from "./admins/admin.router"
import { listingRouter } from "./listings/listing.router"

import multer from 'multer'

import { MimeTypeMap }  from "./types"



dotenv.config()

if(!process.env.PORT){
    console.log('No PORT Found...');
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const MIME_TYPE_MAP : MimeTypeMap = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/webp': 'webp'
};



// Set Storage Engines
const storage = multer.diskStorage({
    destination: './public/uploaded/',
    filename: function(req, file, cb) {
        
        //  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        
        // Check if there's an error with the file
        const ext = MIME_TYPE_MAP[file.mimetype];
        if (!ext) {
            cb(new Error('Error: Images Only!'), ''); // Pass an error to the callback
            return;
        }

        // Construct the filename using the fieldname, current timestamp, and original extension
        const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);

        // Pass null for the error argument and the constructed filename to the callback
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage
}).array('myImage')


const app = express()

// Set Up Public folder
app.use(express.static('./public'))

app.use(cors())
app.use(express.json());
app.use("/api/users", userRouter)
app.use("/api/admins", adminRouter)
app.use("/api/listings", listingRouter)

app.post("/api/upload", (req, res) => {
    
    res.send('test')

    upload(req, res, (err) => {
        if(err){
            res.send('error')
        }else{
            console.log('req.file here: ', req.file)
        }
    })
    
})

app.get("/", (req, res) => {
    res.send(`<h2>Well - Its url: api.blackcommerce.co API on PORT: ${PORT} </h2>`)
})




app.listen(PORT, () => {
    console.log('Listening on port http://localhost:' + PORT)
});