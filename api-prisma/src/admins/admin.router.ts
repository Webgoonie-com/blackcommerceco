import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as AdminService from "./admin.controller";

export const adminRouter = express.Router();

adminRouter.get('/all', async (request: Request, response: Response) => {
    
    try {
        const admins = await AdminService.listAdmins()
        return response.status(200).json(admins);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

adminRouter.post('/createadmin', async (request: Request, response: Response) => {
    

    try {
        const newAdmin = await AdminService.createAdmin(request.body)

        return response.status(200).json(newAdmin);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

adminRouter.post('/loginadmin', async (request: Request, response: Response) => {
    try {
        
        const Admin = await AdminService.loginAdmin(request.body)

        return response.status(200).json(Admin)

    } catch (error: any) {

        return response.status(500).json(error.message)

    }
})


adminRouter.get("/id/:id", async (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10)

    try {
        const user = await AdminService.getAdminId(id)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found Id");
    }

})

adminRouter.get("/uuid/:uuid", async (request: Request, response: Response) => {

    const uuid: string = request.params.id

    try {
        const user = await AdminService.getAdminUuId(uuid)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found by Uuid");
    }

})


adminRouter.get("/email/:email", async (request: Request, response: Response) => {

    const paramEmail: string = request.params.email

    try {
        const admin = await AdminService.getAdminEmail(paramEmail)
        if(admin) {
            return response.status(200).json(admin)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found by this email");
    }

})
