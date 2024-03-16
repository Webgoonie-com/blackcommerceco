import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as ListingService from "./listing.service";

export const listingRouter = express.Router();

import multer from 'multer'
import moment from 'moment'
import path from 'path'


const momentYear = moment().format('YYYY');
const momentMonth = moment().format('MM');
const momentDay = moment().format('DD');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/webp': 'webp'
};

const propertyPhotoStorage = multer.diskStorage({
    destination: 'public/uploaded/propertyphotos/'+momentYear+'/'+momentMonth+'/'+momentDay,
    
    filename: function(req, file, cb){

        //const ext = MIME_TYPE_MAP[file?.mimetype];
        //const ext = file?.mimetype ? MIME_TYPE_MAP[file.mimetype] : undefined;
        const ext = file?.mimetype ? MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP] : undefined;


        if(!ext){
            return cb(null, '')
        }

        cb(null, file.originalname + '-' + Date.now() +path.extname(file.originalname))
    }   
})



const uploadPropertyPhotos = multer({ 
    //dest: 'public/uploaded/propertyphotos/'+momentYear+'/'+momentMonth+'/'+momentDay

    storage: propertyPhotoStorage
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

console.log('Check Before Create Propertyhotos')

// listingRouter.post('/createpropertyphotos', async (request: Request, response: Response) => {

//     const listingPhotos = request.body
//     console.log('Hit Create Propertyhotos', listingPhotos)
//     console.log('req.file here: ', request.file)

//     try {
//         const users = await ListingService.createPropertyPhotos(listingPhotos)
//         return response.status(200).json(users);

//     } catch (error: any) {
//         return response.status(500).json(error.message);
//     }
// })


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