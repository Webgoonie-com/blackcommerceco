"use server"

import axios from 'axios'

export const callCountries = async () => {

    try {
        
        const {data: countries} = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/geography/allcountries`,
        )

        
        
        return countries

    } catch (error) {
        console.log('error', error)
        return error
    }

}



