import axiosWithCredentials from '@/lib/axiosWithCredentials'
import React from 'react'


const apiURL = process.env.NEXT_PUBLIC_API_URL

export const callUsers = async () => {

    try {
        
        const {data: users} = await axiosWithCredentials.get(`${apiURL}/api/users/all`)

        //console.log('users', users)
        return users

    } catch (error) {
        console.log('error', error)
        return error
    }

}
