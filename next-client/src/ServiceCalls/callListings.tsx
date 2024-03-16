import axiosWithCredentials from '@/lib/axiosWithCredentials'
import React from 'react'

export const callListings = async () => {

    try {
        
        const {data: listings} = await axiosWithCredentials.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/all`)

        console.log('listings', listings)
        
        return listings

    } catch (error) {
        console.log('error', error)
        return error
    }

}
