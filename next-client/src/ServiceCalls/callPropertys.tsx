import axios from 'axios'
import React from 'react'

export const callPropertys = async (data: any) => {

    try {
        
        const {data: propertys} = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/propertys/createProperty`, 
            data
        )

        console.log('propertys', propertys)
        
        return propertys

    } catch (error) {
        console.log('error', error)
        return error
    }

}


export const autoSavePropertyData = async (data: any, autoSaveToken: any) => {
    
    console.log('Line 24: autoSavePropertyData', data)
    console.log('Line 24: autoSaveToken', autoSaveToken)

    

    const postData = {
        ...data, token: autoSaveToken
        
    }
    
    console.log('Line 24: autoSaveToken', postData)

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/propertys/autoSavePropertyData`, postData);
        
        console.log('Line 38 on Call Property AutoSave Response Data', response.data)

        return response.data;

    } catch (error) {
        console.error('Error occurred while auto saving property data:', error);
        throw error;
    }
};