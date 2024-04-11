import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as AdminService from "./general.controller";

export const generalRouter = express.Router();

generalRouter.get('/all', async (request: Request, response: Response) => {
    
    try {
        const admins = await AdminService.listEmailSubscribers()
        return response.status(200).json(admins);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

generalRouter.post('/createEmailSubscriber', async (request: Request, response: Response) => {

    const body = await request.body;

    console.log('Line 24 on general createEmailSubscriber Log Body', body)

    
    try {
        const admins = await AdminService.createEmailSubscriber(body)
        return response.status(200).json(admins);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})