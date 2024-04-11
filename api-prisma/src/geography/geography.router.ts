import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as GeographyController from "./geography.controller";

export const geographyRouter = express.Router();

geographyRouter.get('/allcountries', async (request: Request, response: Response) => {
    
    console.log('Hit Countries on Geography Router')
    try {
        const users = await GeographyController.listCountries()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

geographyRouter.get('/allregions', async (request: Request, response: Response) => {
    try {
        const users = await GeographyController.listCountries()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})