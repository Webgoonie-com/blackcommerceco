// import axiosWithCredentials from '@/lib/axiosWithCredentials'
import getCurrentUsers from '@/Actions/getCurrentUser'
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


export const autoSavePrimaryUserPhoto =  async (selectedImage: string[], autoSaveToken: any, userId: any) => {

    const currentUser = await getCurrentUsers()
    
    try {
        const userPhotoPostData = {
            userId: currentUser?.id,
            imageUrl: selectedImage,
        }

        // console.log('userPhotoPostData', userPhotoPostData)
        
        const {data: users} = await axios.post(
            `${apiURL}/api/users/makePrimaryPhoto`,
            userPhotoPostData
        )

        //console.log('users', users)
        return users

    } catch (error) {
        console.log('error', error)
        return error
    }

}


export const deleteAutoSaveProfilePhoto = async (data: any, autoSaveToken: any, userId: any) => {
    
    const imageUrl = await data

    try {
        
         const postPhotoData = {
            imageUrl,
            userId,
            autoSaveToken

         }

        const {data: propertyphotoResult} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/deleteUserProfilePhoto`, postPhotoData)
        
        return propertyphotoResult

    } catch (error) {
        console.log('error', error)
        return error
    }

}