import express from 'express'
import type { Request, Response } from 'express'

import * as BusinessController from "./business.controller";

export const businessRouter = express.Router();

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

    
    const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP]
    
    if(!ext){
        return callback(new Error('Error: Sorry fileFilter Only Images Are Allowed!'))
    }

    checkFileType(file, callback)

    callback(null, true);
};

//  Begin Multer Photo Path And Config ----

const businessPhotoStorage = multer.diskStorage({
    
    destination: 'public/uploaded/businessphotos/'+momentYear+'/'+momentMonth+'/'+momentDay,
    
    filename: function(req, file, cb) {
        // Extract the extension from MIME type
        const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];

        // If extension is not found or the file's original name doesn't have an extension,
        // generate filename based on MIME type
        if (!ext || !file.originalname.includes('.')) {
            let filename = 'businessPhoto-' + Date.now();

            // Use .jpg extension for JPEG images
            if (ext) {
                filename += `.${ext}`;
            } else {
                // If MIME type is not found in the map, return an error
                return cb(new Error('Error:  businessPhotoStorage = multer.diskStorage  Only images are allowed!'), filename);
            }

            cb(null, filename);
        } else {
            // If extension is found in the original filename, use it
            cb(null, 'businessPhoto-' + Date.now() + path.extname(file.originalname).toLowerCase());
        }
    }   
});

const uploadBusinessPhotos = multer({ 
    
    storage: businessPhotoStorage,
    
    //  This is a custom fileLimit.
    limits: fileLimit,  //  {fileSize: 1000000},

    //  This is a custom fileFilter.
    fileFilter: fileFilter

    
    
});



//  Begin Routes ----

businessRouter.get('/allbusinesses', async (request: Request, response: Response) => {
    
    try {
        const users = await BusinessController.listBusinesses()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})




businessRouter.post('/createbusinessphotos', uploadBusinessPhotos.array('files'), async (request: any, response: any) => {
    try {
        // Combine both files and body data
        const listingData = {
            files: request.files,
            body: request.body
        };

        // Call the service function with the combined data
        const createdPropertyPhotos = await BusinessController.createBusinessPhotos(listingData);
        
        return response.status(200).json(createdPropertyPhotos);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

businessRouter.post('/autoSaveBusinessData', async (request, response) => {


    try {
        const businessData = request.body; // Assuming you're sending the business data in the request body

        // Call the service function with the received data
        const createdBusiness = await BusinessController.autoSaveBusinessData(businessData, businessData);

        return response.status(200).json(createdBusiness);
    } catch (error) {
        return response.status(500).json({ error });
    }
});

businessRouter.post('/createBusiness', async (request, response) => {


    try {
        const businessData = request.body;

        // Call the service function with the received data
        const createdBusiness = await BusinessController.createBusiness(businessData, businessData);

        return response.status(200).json(createdBusiness);
    } catch (error) {
        return response.status(500).json({ error });
    }
});


businessRouter.get("/id/:id", async (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10)

    try {
        const user = await BusinessController.getBusinessId(id)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found Id");
    }

})

businessRouter.get("/uuid/:uuid", async (request: Request, response: Response) => {

    const uuid: string = request.params.id

    try {
        const user = await BusinessController.getBusinessUuId(uuid)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found by Uuid");
    }

})



businessRouter.post('/deleteAutoSaveBusinessPhoto/:imageurl', async (request: Request, response: Response) => {    

    try {
        const businessData = request.body; // Assuming you're sending the business data in the request body

        // Call the service function with the received data
        const deleteAutoSavePhoto = await BusinessController.deleteAutoSavePhoto(businessData);

        return response.status(200).json(deleteAutoSavePhoto);
    } catch (error) {
        return response.status(500).json({ error });
    }
});