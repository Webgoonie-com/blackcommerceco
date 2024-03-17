import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as ListingService from "./listing.service";

export const listingRouter = express.Router();

import multer, { FileFilterCallback } from 'multer'
import moment from 'moment'
import path from 'path'


const momentYear = moment().format('YYYY');
const momentMonth = moment().format('MM');
const momentDay = moment().format('DD');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/octet-stream': 'jpg',
    'image/avif': 'avif',
    'image/webp': 'webp'
};

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

    console.log('file', file)
    console.log('ext', ext)
    
    if(!ext){
        return callback(new Error('Error: Sorry fileFilter Only Images Are Allowed!'))
    }

    // return error if the file type is not image
    // if (!file || file.mimetype.split('/')[0] != 'image' ||) {
    //     return callback(new Error('Only images allowed'));
    // }

    

    checkFileType(file, callback)

    callback(null, true);
};


async function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback){
    console.log('Checking file type', file)

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





const propertyPhotoStorage = multer.diskStorage({
    destination: 'public/uploaded/propertyphotos/'+momentYear+'/'+momentMonth+'/'+momentDay,
    
    filename: function(req, file, cb) {
        // Extract the extension from MIME type
        const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];

        // If extension is not found or the file's original name doesn't have an extension,
        // generate filename based on MIME type
        if (!ext || !file.originalname.includes('.')) {
            let filename = 'propertyPhoto-' + Date.now();

            // Use .jpg extension for JPEG images
            if (ext) {
                filename += `.${ext}`;
            } else {
                // If MIME type is not found in the map, return an error
                return cb(new Error('Error:  propertyPhotoStorage = multer.diskStorage  Only images are allowed!'), filename);
            }

            cb(null, filename);
        } else {
            // If extension is found in the original filename, use it
            cb(null, 'propertyPhoto-' + Date.now() + path.extname(file.originalname).toLowerCase());
        }
    }   
});





const uploadPropertyPhotos = multer({ 
    
    storage: propertyPhotoStorage,
    
    //  This is a custom fileLimit.
    limits: fileLimit,  //  {fileSize: 1000000},

    //  This is a custom fileFilter.
    fileFilter: fileFilter

    
    
});


listingRouter.get('/allProperties', async (request: Request, response: Response) => {
    
    console.log('We Hit To Get A List Of all Properties')
    try {
        const users = await ListingService.listPropertys()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

listingRouter.post('/createproperty', async (request: Request, response: Response) => {

    const listing = request.body

    try {
        const listings = await ListingService.createProperty(listing)
        return response.status(200).json(listings);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})



listingRouter.post('/createpropertyphotos', uploadPropertyPhotos.array('files'), async (request: any, response: any) => {
    try {
        // Combine both files and body data
        const listingData = {
            files: request.files,
            body: request.body
        };

        // Call the service function with the combined data
        const createdPropertyPhotos = await ListingService.createPropertyPhotos(listingData);
        
        return response.status(200).json(createdPropertyPhotos);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});