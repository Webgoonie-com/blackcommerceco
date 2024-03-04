import express from 'express'
import type { Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

import * as UserService from "./user.service";

export const userRouter = express.Router();

userRouter.get('/all', async (request: Request, response: Response) => {
    try {
        const users = await UserService.listUsers()
        return response.status(200).json(users);

    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

userRouter.get("/id/:id", async (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10)

    try {
        const user = await UserService.getUserId(id)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found Id");
    }

})

userRouter.get("/uuid/:uuid", async (request: Request, response: Response) => {

    const uuid: string = request.params.id

    try {
        const user = await UserService.getUserUuId(uuid)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found by Uuid");
    }

})

userRouter.get("/email/:email", async (request: Request, response: Response) => {

    const paramEmail: string = request.params.email

    try {
        const user = await UserService.getUserEmail(paramEmail)
        if(user) {
            return response.status(200).json(user)
        }
    } catch (error) {
        return response.status(500).json("User Could Not Be Found by this email");
    }

})

userRouter.post(
    '/createUser',
    body("firstName").isString(),
    body("lastName").isString(),
    body("hashedPassword").isString(),
    async (request: Request, response: Response) => {

        const errors = validationResult(request)

        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors.array() })
        }

        try {
            const user = request.body
            
            const newUser = await UserService.createUser(user)

            return response.status(201).json(newUser)

        } catch (error: any) {

            return response.status(500).json(error.message)

        }
})

userRouter.post('/create', async (request: Request, response: Response) => {
    try {
        
        const newUser = await UserService.createUser(request.body)

        return response.status(200).json(newUser)

    } catch (error: any) {

        return response.status(500).json(error.message)

    }
})



userRouter.post('/loginuser', async (request: Request, response: Response) => {
    try {
        
        const newUser = await UserService.loginUser(request.body)

        return response.status(200).json(newUser)

    } catch (error: any) {

        return response.status(500).json(error.message)

    }
})



// PUT: Update User
// Params: firstName, lastName
userRouter.put(
    '/updateUser/:id',
    body("firstName").isString(),
    body("lastName").isString(),
    async (request: Request, response: Response) => {

        const errors = validationResult(request)

        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors.array() })
        }

        const id: number = parseInt(request.params.id, 10)

        try {
            const user = request.body
            
            const updatedUser = await UserService.updateUser(user, id)

            return response.status(201).json(updatedUser)

        } catch (error: any) {

            return response.status(500).json(error.message)

        }
})


userRouter.delete("deleteUserId/:id"), async(request: Request, response: Response) => {
    
    const id: number = parseInt(request.params.id, 10)

    try {
        
        await UserService.deleteUserId(id)
        return response.status(204).json("User has been deleted successfully")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }

}

userRouter.delete("deleteUserUuid/:uuid"), async(request: Request, response: Response) => {
    
    const uuid: string = request.params.uuid

    try {
        
        await UserService.deleteUserUuid(uuid)
        return response.status(204).json("User has been deleted successfully")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }

}