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



export const getPropertyListings = async () => {
    
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


export const getBusinessListings = async () => {
    
    console.log(`${process.env.NEXT_PUBLIC_API_URL} + '/api/listings/allBusinesses`)

    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/listings/allBusinesses');
        console.log('Line 44 /api/listings/allBusinesses response', response.data)
        return response.data; // Assuming the API returns an array of listings
    } catch (error) {
        //console.error('Error fetching listings:', error);
        return []; // Return an empty array or handle the error as needed
    }
};

export const getPropertyListingsByUuid = async (listingUuid: any) => {
    
    console.log(`${process.env.NEXT_PUBLIC_API_URL} + '/api/listings/allBusinesses`)

    try {
        //const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/listings/allBusinesses');
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/propertyuuid/'+listingUuid);
        console.log('Line 44 /api/listings/allBusinesses response', response.data)
        return response.data; // Assuming the API returns an array of listings
    } catch (error) {
        //console.error('Error fetching listings:', error);
        return []; // Return an empty array or handle the error as needed
    }
};

export const getBusinessListingsByUuid = async (listingUuid: any) => {
    
    console.log(process.env.NEXT_PUBLIC_API_URL + '/api/listings/propertyuuid/'+listingUuid)

    try {
        
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/businessuuid/'+listingUuid);

        console.log('Line 44 /api/listings/allBusinesses response', response.data)
        return response.data; // Assuming the API returns an array of listings
    } catch (error) {
        //console.error('Error fetching listings:', error);
        return []; // Return an empty array or handle the error as needed
    }
};


export default callListings 