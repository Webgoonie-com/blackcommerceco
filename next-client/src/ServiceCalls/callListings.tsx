import axios from 'axios';
import React from 'react'

export const callListings = async () => {

    try {
        
        const {data: listings} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/all`)

        console.log('listings', listings)
        
        return listings

    } catch (error) {
        console.log('error', error)
        return error
    }

}



const getListings = async () => {
    
    console.log(`${process.env.NEXT_PUBLIC_API_URL} + '/api/listings/all`)

    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/listings/all');
        //console.log('/listings/all response', response.data)
        return response.data; // Assuming the API returns an array of listings
    } catch (error) {
        //console.error('Error fetching listings:', error);
        return []; // Return an empty array or handle the error as needed
    }
};

export default getListings;
