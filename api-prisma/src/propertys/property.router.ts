import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as PropertyService from "./property.controller";

export const propertyRouter = express.Router();


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


propertyRouter.post('/createProperty', async (request: Request, response: Response) => {
    
    console.log('Hit Create Property')
    const propertyData = await request.body;
    console.log('Hit Create propertyData', propertyData)

    
    try {
        const property = await PropertyService.createProperty(propertyData)
        return response.status(200).json(property);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouter.post('/autoSavePropertyData', async (request: Request, response: Response) => {
    
    console.log('Hit Create Property')
    const propertyData = await request.body;
    
    try {
        const property = await PropertyService.autoSavePropertyData(propertyData)
        return response.status(200).json(property);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

propertyRouter.get("/id/:id", async (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10)

    console.log('Property Id', id)

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

    const uuid: string = request.params.id

    try {
        const property = await PropertyService.getPropertyUuId(uuid)
        if(property) {
            return response.status(200).json(property)
        }
    } catch (error) {
        return response.status(500).json("Property Could Not Be Found by Uuid");
    }

})