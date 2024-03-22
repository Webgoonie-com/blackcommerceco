import axiosWithCredentials from '@/lib/axiosWithCredentials'
import axios from 'axios'
import React from 'react'

export const callPropertyPhotos = async () => {

    try {
        
        const {data: propertyphotos} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/propertyphotos/all`)

        console.log('propertyphotos', propertyphotos)
        
        return propertyphotos

    } catch (error) {
        console.log('error', error)
        return error
    }

}

export const deletePropertyPhoto = async (data: any, autoSaveToken: any, userId: any) => {
    
    const propertyPhotoData = await data

    console.log('Line 25 deletePropertyPhoto', propertyPhotoData)
    console.log('Line 26 userId', userId)

    try {
        
         const postPhotoData = {
            propertyPhotoData,
            userId,
            autoSaveToken

         }

        const {data: propertyphotoResult} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/propertys/deletePhoto/:`+autoSaveToken, postPhotoData)

        console.log('propertyphotoResult: ', propertyphotoResult)
        
        return propertyphotoResult

    } catch (error) {
        console.log('error', error)
        return error
    }

}
