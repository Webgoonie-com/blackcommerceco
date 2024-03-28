import axios from 'axios';
import React from 'react'

export const callListings = async () => {

    try {
        
        const {data: listings} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/all`)

        return listings

    } catch (error) {
        console.log('error', error)
        return error
    }

}



export const getPropertyListings = async () => {
    
    

    try {

        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/listings/allProperties');

        return response.data;

    } catch (error) {

        console.error('Error fetching listings:', error);

        return [];

    }
};


export const getBusinessListings = async () => {
    
    try {
        
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/listings/allBusinesses');    
        
        return response.data;

    } catch (error) {
        console.error('Error fetching listings:', error);
        return [];
    }
};

export const getPropertyListingsByUuid = async (listingUuid: any) => {
    
    try {
        
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/propertyuuid/'+listingUuid);

        return response.data;

    } catch (error) {
        console.error('Error fetching listings:', error);
        return [];
    }
};

export const getBusinessListingsByUuid = async (listingUuid: any) => {
    
    try {
        
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/businessuuid/'+listingUuid);


        return response.data

    } catch (error) {

        return [];

    }
};


export default callListings 