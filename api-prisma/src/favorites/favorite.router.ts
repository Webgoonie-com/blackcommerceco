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

favoriteRouter.post('/userIdFavorites', async (request: Request, response: Response) => {

    //const listingId: string = request.params.listingId
    
    const body: string = request.body

    const { userId } = await request.body

    console.log('addfavorites userIdFavorites', userId)
    console.log('addfavorites body', body)


    
    try {
        const users = await FavoriteController.getUserIdFavorites(parseInt(userId))
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }

})