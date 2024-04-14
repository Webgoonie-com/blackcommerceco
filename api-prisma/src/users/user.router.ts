import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as UserController from "./user.controller";

export const userRouter = express.Router();


    //  multerSetUp 

import multer, { FileFilterCallback } from 'multer'
import moment from 'moment'
import path from 'path'

const momentYear = moment().format('YYYY');
const momentMonth = moment().format('MM');
const momentDay = moment().format('DD');

//  Begin Multer File Types Config ----
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/octet-stream': 'jpg',
    'image/avif': 'avif',
    'image/webp': 'webp'
};

async function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback){
   // console.log('Checking file type', file)

    // Check if the file has a valid image extension
    const validExtension = /\.(jpeg|jpg|png|avif|gif|webp)$/.test(path.extname(file.originalname).toLowerCase());

    // Check if the file's MIME type is recognized or generic binary with a valid extension
    const isValidFile = validExtension || file.mimetype === 'application/octet-stream';

    if (isValidFile) {
        return cb(null, true); // File is valid
    } else {
        cb(new Error('checkFileType Only images are allowed!')); // File is invalid
    }
}

const fileLimit = {
    fileSize: 1024 * 1024 * 10 // limits the file size to 10MB
};


const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
) => {

    //const ext = MIME_TYPE_MAP[file.mimetype];
    const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP]

    if(!ext){
        return callback(new Error('Error: Sorry fileFilter Only Images Are Allowed!'))
    }

    checkFileType(file, callback)

    callback(null, true);
};



//  Begin Multer Photo Path And Config ----
const userProfilePhotoStorage = multer.diskStorage({

    destination: 'public/uploaded/userphotos/'+momentYear+'/'+momentMonth+'/'+momentDay,
    
    filename: function(req, file, cb) {

        // Extract the extension from MIME type
        const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];

        // If extension is not found or the file's original name doesn't have an extension,
        // generate filename based on MIME type
        if (!ext || !file.originalname.includes('.')) {
            let filename = 'userPhoto-' + Date.now();

            // Use .jpg extension for JPEG images
            if (ext) {
                filename += `.${ext}`;
            } else {
                // If MIME type is not found in the map, return an error
                return cb(new Error('Error:  userProfilePhotoStorage = multer.diskStorage  Only images are allowed!'), filename);
            }

            cb(null, filename);
        } else {
            // If extension is found in the original filename, use it
            cb(null, 'userPhoto-' + Date.now() + path.extname(file.originalname).toLowerCase());
        }
    }   
});


const uploadUserProfilePhotos = multer({ 
    
    storage: userProfilePhotoStorage,
    
    //  This is a custom fileLimit.
    limits: fileLimit,  //  {fileSize: 1000000},

    //  This is a custom fileFilter.
    fileFilter: fileFilter

    
    
});



userRouter.get('/all', async (request: Request, response: Response) => {
    try {
        const users = await UserController.listUsers()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

userRouter.get("/id/:id", async (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10)

    try {
        const user = await UserController.getUserId(id)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found Id");
    }

})

userRouter.get("/uuid/:uuid", async (request: Request, response: Response) => {

    const uuid: string = request.params.id

    try {
        const user = await UserController.getUserUuId(uuid)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found by Uuid");
    }

})

userRouter.get("/email/:email", async (request: Request, response: Response) => {

    const paramEmail: string = request.params.email

    try {
        const user = await UserController.getUserEmail(paramEmail)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found by this email");
    }

})

userRouter.post(
    '/createUser',
    body("firstName").isString(),
    body("lastName").isString(),
    body("hashedPassword").isString(),
    async (request: Request, response: Response) => {

        //  console.log('Hit Create User')
        
        const errors = validationResult(request)

        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors.array() })
        }

        try {
            const user = request.body
            
            const newUser = await UserController.createUser(user)

            return response.status(201).json(newUser)

        } catch (error: any) {

            return response.status(500).json(error.message)

        }
})

userRouter.post('/createUserProfilePhotos', uploadUserProfilePhotos.array('files'), async (request: Request, response: Response) => {
    
    // console.log('Hit createUserProfilePhotos request.files', request.files)
    // console.log('Hit createUserProfilePhotos request.body',request.body)
    
    try {
        
        const userPhotoData = {
            files: request.files,
            body: request.body
        };

        // console.log('userPhotoData', userPhotoData)

        const userPhoto = await UserController.createUserProfilePhoto(userPhotoData as any);

        return response.status(200).json(userPhoto)

    } catch (error: any) {

        return response.status(500).json(error.message)

    }
})


userRouter.post('/create', async (request: Request, response: Response) => {
    try {
        
        const newUser = await UserController.createUser(request.body)

        return response.status(200).json(newUser)

    } catch (error: any) {

        return response.status(500).json(error.message)

    }
})



userRouter.post('/loginuser', async (request: Request, response: Response) => {

    try {

        //  console.log('/loginuser: request.body = ', request.body)
        
        const newUser = await UserController.loginUser(request.body)

        return response.status(200).json(newUser)

    } catch (error: any) {

        return response.status(500).json(error.message)

    }
})


userRouter.post("/makePrimaryPhoto/", async (request: Request, response: Response) => {

    const userProfilePhotoData = await request.body;

    //  console.log('userProfilePhotoData', userProfilePhotoData)

    try {
        const property = await UserController.updateteUserPrimaryPhoto(userProfilePhotoData)
        return response.status(200).json(property);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})




// PUT: Update User
// Params: firstName, lastName
userRouter.put(
    '/updateUser/:id',
    body("firstName").isString(),
    body("lastName").isString(),
    async (request: Request, response: Response) => {

        const errors = validationResult(request)

        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors.array() })
        }

        const id: number = parseInt(request.params.id, 10)

        try {
            const user = request.body
            
            const updatedUser = await UserController.updateUser(user, id)

            return response.status(201).json(updatedUser)

        } catch (error: any) {

            return response.status(500).json(error.message)

        }
})


userRouter.delete("deleteUserId/:id"), async(request: Request, response: Response) => {
    
    const id: number = parseInt(request.params.id, 10)

    try {
        
        await UserController.deleteUserId(id)
        return response.status(204).json("User has been deleted successfully")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }

}

userRouter.delete("deleteUserUuid/:uuid"), async(request: Request, response: Response) => {
    
    const uuid: string = request.params.uuid

    try {
        
        await UserController.deleteUserUuid(uuid)
        return response.status(204).json("User has been deleted successfully")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }

}


userRouter.post('/deleteAutoSaveProfilePhoto/:imageurl', async (request: Request, response: Response) => {    

    try {
        const businessData = request.body; // Assuming you're sending the business data in the request body

        // Call the service function with the received data
        const deleteAutoSavePhoto = await UserController.deleteAutoSaveProfilePhoto(businessData);

        return response.status(200).json(deleteAutoSavePhoto);
    } catch (error) {
        return response.status(500).json({ error });
    }
});

userRouter.post('/deleteUserProfilePhoto', async (request: Request, response: Response) => {    

    //  console.log('userProfilePhotoData on router request.body, ',  request.body)


    try {
        const userProfilePhotoData = request.body; // Assuming you're sending the business data in the request body

        

        // Call the service function with the received data
        const deletuserProfilePhotoData = await UserController.deleteProfilePhoto(userProfilePhotoData);

        return response.status(200).json(deletuserProfilePhotoData);
    } catch (error) {
        return response.status(500).json({ error });
    }
});