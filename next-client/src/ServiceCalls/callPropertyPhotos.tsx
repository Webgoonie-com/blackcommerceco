"use server"

import axios from 'axios'

export const callPropertyPhotos = async () => {

    try {
        
        const {data: propertyphotos} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/propertyphotos/all`)
        
        return propertyphotos

    } catch (error) {

        console.log('error', error)

        return error

    }
}

export const deleteAutoSavePropertyPhoto = async (data: any, autoSaveToken: any, userId: any) => {

    const propertyPhotoData = await data

    try {

         const postPhotoData = {
            propertyPhotoData,
            userId,
            autoSaveToken
         }

        const {data: propertyphotoResult} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/propertys/deleteAutoSavePropertyPhoto/:`+autoSaveToken, postPhotoData)

        return propertyphotoResult

    } catch (error) {

        console.log('error', error)

        return error

    }

}
