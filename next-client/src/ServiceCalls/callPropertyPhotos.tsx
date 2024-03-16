import axiosWithCredentials from '@/lib/axiosWithCredentials'
import React from 'react'

export const callPropertyPhotos = async () => {

    try {
        
        const {data: propertyphotos} = await axiosWithCredentials.get(`${process.env.NEXT_PUBLIC_API_URL}/api/propertyphotos/all`)

        console.log('propertyphotos', propertyphotos)
        
        return propertyphotos

    } catch (error) {
        console.log('error', error)
        return error
    }

}
