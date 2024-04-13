// import axiosWithCredentials from '@/lib/axiosWithCredentials'
import axios from 'axios'
import React from 'react'


const apiURL = process.env.NEXT_PUBLIC_API_URL

export const callUsers = async () => {

    try {
        
        const {data: users} = await axios.get(`${apiURL}/api/users/all`)

        //console.log('users', users)
        return users

    } catch (error) {
        console.log('error', error)
        return error
    }

}



export const deleteAutoSaveProfilePhoto = async (data: any, autoSaveToken: any, userId: any) => {
    
    const userPhotoData = await data

    try {
        
         const postPhotoData = {
            userPhotoData,
            userId,
            autoSaveToken

         }

        const {data: propertyphotoResult} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/deleteAutoSaveProfilePhoto/:`+autoSaveToken, postPhotoData)
        
        return propertyphotoResult

    } catch (error) {
        console.log('error', error)
        return error
    }

}