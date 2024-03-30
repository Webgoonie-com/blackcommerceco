import express from 'express'
import type { Request, Response } from 'express'
import * as PropertyService from "./property.controller";
import multer, { FileFilterCallback } from 'multer'
import moment from 'moment'
import path from 'path'
import { listAdmins } from '../admins/admin.controller';


export const propertyRouter = express.Router();




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

    //const ext = MIME_TYPE_MAP[file.mimetype];
    const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP]
    
    if(!ext){
        return callback(new Error('Error: Sorry fileFilter Only Images Are Allowed!'))
    }    

    checkFileType(file, callback)

    callback(null, true);
};

//  Begin Multer Photo Path And Config ----
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

propertyRouter.get('/all', async (request: Request, response: Response) => {
    try {
        const propertys = await PropertyService.listPropertys()
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouter.get('/allProperties', async (request: Request, response: Response) => {
    try {
        const propertys = await PropertyService.listPropertys()
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouter.get("/id/:id", async (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10)

    try {
        const property = await PropertyService.getPropertyId(id)
        if(property) {
            return response.status(200).json(property)
        }
    } catch (error) {
        return response.status(500).json("Property Could Not Be Found Id");
    }

})

propertyRouter.get("/uuid/:uuid", async (request: Request, response: Response) => {

    const uuid: string = request.params.uuid

    try {
        const property = await PropertyService.getPropertyUuId(uuid)
        
        if(property) {
            return response.status(200).json(property)
        }

    } catch (error) {
        
        return response.status(500).json("Property Could Not Be Found by Uuid");
    }

})

propertyRouter.post('/createProperty', async (request: Request, response: Response) => {
    
    const propertyData = await request.body;
        
    try {
        const property = await PropertyService.createProperty(propertyData)
        return response.status(200).json(property);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouter.post('/createpropertyphotos', uploadPropertyPhotos.array('files'), async (request: Request, response: Response) => {
    
    const propertyPhotoData = await request.body;
        
    try {
        const propertyPhoto = await PropertyService.createPropertyPhotos(propertyPhotoData)
        return response.status(200).json(propertyPhoto);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouter.post('/autoSavePropertyData', async (request: Request, response: Response) => {
    
    const propertyData = await request.body;
    
    try {
        const property = await PropertyService.autoSavePropertyData(propertyData, propertyData)
        return response.status(200).json(property);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouter.post("/makePrimaryPhoto/:listingId", async (request: Request, response: Response) => {

    const propertyPhotoData = await request.body;

    console.log('propertyPhotoData', propertyPhotoData)

    try {
        const property = await PropertyService.updatetePropertyPrimaryPhoto(propertyPhotoData)
        return response.status(200).json(property);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})


propertyRouter.get("/reservationsproperty/:uuid", async (request: Request, response: Response) => {

    const uuid: string = request.params.uuid

    try {
        const property = await PropertyService.getPropertyReservationUuId(uuid)
        if(property) {
            return response.status(200).json(property)
        }
    } catch (error) {
        return response.status(500).json("Reservation Could Not Be Found by Uuid");
    }

})

propertyRouter.post('/reservations/:createPropertyReservation', async (request: Request, response: Response) => {
    
    const propertyPhotoData = await request.body

    const checkBody = await request.body

    //console.log('Hit Create Property Reservation: ', propertyPhotoData);

    const {listingId, userId, totalPrice, startDate, endDate, propertyUuid } = checkBody;

    if (!userId || !totalPrice || !startDate || !endDate || !propertyUuid) {
        return response.status(500).json("Error On Reservationractions")
    }


    try {
        const propertys = await PropertyService.createPropertyReservation(propertyPhotoData)
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})

propertyRouter.post('/deleteAutoSavePropertyPhoto/:imageurl', async (request: Request, response: Response) => {
    
    const propertyPhotoData = await request.body

    try {
        const propertys = await PropertyService.deleteAutoSavePropertyPhoto(propertyPhotoData)
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})

propertyRouter.post('/deleteProperty/uuid/:uuid', async (request: Request, response: Response) => {
    
    const propertyPhotoData = await request.body

    console.log('Hit /deleteProperty/uuid/:uuid')

    try {
        const propertys = await PropertyService.deleteProperty(propertyPhotoData)
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})