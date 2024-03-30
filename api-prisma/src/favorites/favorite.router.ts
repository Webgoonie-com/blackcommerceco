import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as FavoriteController from "./favorite.controller";

export const favoriteRouter = express.Router();


favoriteRouter.get('/all', async (request: Request, response: Response) => {

    try {
        const users = await FavoriteController.listFavorites()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})

favoriteRouter.post('/userIdFavorites:userId', async (request: Request, response: Response) => {

    const listingId: string = request.params.listingId
    
    const body: string = request.body

    console.log('addfavorites listingId', listingId)
    console.log('addfavorites body', body)

    const listingData = {
        files: request.files,
        body: request.body
    };
    
    try {
        const users = await FavoriteController.getUserIdFavorites(parseInt(listingId), listingData)
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})