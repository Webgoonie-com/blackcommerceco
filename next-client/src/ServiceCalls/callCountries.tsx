import React from 'react'
import axios from 'axios'

export const callCountries = async () => {

    try {
        
        const {data: countries} = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/geography/allcountries`,
        )

        console.log('countries', countries)
        
        return countries

    } catch (error) {
        console.log('error', error)
        return error
    }

}



