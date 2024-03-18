import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as PropertyService from "./property.controller";

export const propertyRouterr = express.Router();


propertyRouterr.get('/all', async (request: Request, response: Response) => {
    try {
        const users = await PropertyService.listPropertys()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouterr.get('/allProperties', async (request: Request, response: Response) => {
    try {
        const users = await PropertyService.listPropertys()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})


propertyRouterr.post('/createProperty', async (request: Request, response: Response) => {
    
    console.log('Hit Create Property')
    const propertyData = await request.body;
    
    try {
        const users = await PropertyService.createProperty(propertyData)
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouterr.post('/autoSavePropertyData', async (request: Request, response: Response) => {
    
    console.log('Hit Create Property')
    const propertyData = await request.body;
    
    try {
        const users = await PropertyService.autoSavePropertyData(propertyData)
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})
