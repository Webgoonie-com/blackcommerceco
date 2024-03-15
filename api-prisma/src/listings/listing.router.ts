import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as ListingService from "./listing.service";

export const listingRouter = express.Router();

import multer from 'multer'

const upload = multer({ dest: 'uploads/' });


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


listingRouter.post('/createpropertyphotos', upload.array('files'), async (request: any, response: any) => {
    // request.files will contain an array of files uploaded
    console.log('Uploaded files:', request.files['files[]']);
    console.log('Uploaded files:', request.body);

    //const uploadedFile = request.files['[files]'];
    const uploadedFile = request.files['files[]'];

    console.log('Uploaded uploadedFile:', uploadedFile);
    try {
        const users = await ListingService.createPropertyPhotos(request.files);
        return response.status(200).json(users);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});