import express from 'express'
import type { Request, Response } from 'express'
import * as PropertyController from "./reservation.controller";


export const reservationRouter = express.Router();


reservationRouter.get('/all', async (request: Request, response: Response) => {
    try {
        const propertys = await PropertyController.listReservations()
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

reservationRouter.get('/listingsWithReservations', async (request: Request, response: Response) => {
    try {
        const propertys = await PropertyController.getListingsWithReservations()
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

reservationRouter.get("/reservationByUuid/:uuid", async (request: Request, response: Response) => {

    const uuid: string = request.params.uuid

    try {
        const propertys = await PropertyController.getReservationByUuId(uuid)
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

reservationRouter.post("/queryreservations/:strings", async (request: Request, response: Response) => {

    const strings: string = await request.params.strings

    const body = await request.body



    try {
        const propertys = await PropertyController.queryReservationsByStrings(body, strings)
        return response.status(200).json(propertys);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})