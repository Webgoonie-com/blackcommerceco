import getCurrentUser from '@/Actions/getCurrentUser';
import axios from 'axios';
import React from 'react'


export const callFavorites = async () => {

    const currentUser = await getCurrentUser()
    
    console.log('Line 10 currentUser: ', currentUser)


    try {
        
        const {data: favorites} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites/all`)

        return favorites

    } catch (error) {
        console.log('error', error)
        return error
    }

}
