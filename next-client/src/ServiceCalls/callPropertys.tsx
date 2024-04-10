"use server"

import axios from 'axios'

export const callPropertys = async () => {

    try {
        
        const {data: propertys} = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/propertys/allproperties`
        )

        

        return propertys

    } catch (error) {
        console.log('error', error)
        return error
    }

}

export const callPropertysbyUser = async (userId: number) => {

    try {
        
        const {data: propertys} = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/propertys/propertysbyUser/`+userId
        )

        

        return propertys

    } catch (error) {
        console.log('error', error)
        return error
    }

}

export const createProperty = async (data: any) => {

    try {

        const {data: propertys} = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/propertys/createProperty`, 
            data
        )
        

        return propertys

    } catch (error) {
        console.log('error', error)
        return error
    }

}


export const autoSavePropertyData = async (data: any, autoSaveToken: any, userId: any) => {

    const postData = {
        ...data, 
        token: autoSaveToken,
        userId: userId
    }
    
    try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/propertys/autoSavePropertyData`, postData)

        return response.data

    } catch (error) {

        console.error('Error occurred while auto saving property data:', error)

        throw error
    }
};