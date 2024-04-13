import getCurrentUsers from '@/Actions/getCurrentUser';
import axios from 'axios';
import React from 'react'

export interface IBapsListingParams {
    userId?: number;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export interface IBbsListingParams {
    userId?: number;
    locationValue?: string;
    category?: string;
}

export const callListings = async () => {

    try {
        
        const {data: listings} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/all`)

        return listings

    } catch (error) {
        console.log('error', error)
        return error
    }

}



export const queryPropertyListings = async (params: IBapsListingParams) => {
    


    const currentUser = await getCurrentUsers();

    //  console.log('queryPropertyListings new params: ', params)

    const {

       
        roomCount,
        guestCount,
        bathroomCount,
        locationValue,
        startDate,
        endDate,
        category

    } = params;



    

    try {

     

        // console.log('userId from system: ', currentUser?.id);
        // console.log('roomCount from params: ', roomCount);

        // console.log('guestCount before conversion: ', guestCount);
        // console.log('bathroomCount before conversion: ', bathroomCount);

        const userId =  currentUser?.id;


        //  let query: any = {};

        // if (userId) {
        //     query.userId = userId;
        // }
        
        // if (category) {
        //     query.category = category;
        // }

        // if (guestCount) {
        //     query.guestCount = {
        //         gte: +guestCount as number
        //     }
        // }
        
        // if (bathroomCount) {
        //     const newBathRoomCount =  parseInt(bathroomCount as any)
        //     query.bathroomCount = {
        //         gte: +newBathRoomCount as number
        //     }
        // }
        
        // if (locationValue) {
        //     query.locationValue = locationValue;
        // }

        // if (startDate && endDate)
        // {

        
        //     query.NOT = {

        //         reservations: {
        //             some: {
        //                 OR: [ 
        //                     {
        //                         endDate: { gte: startDate },
        //                         startDate: { lte: startDate },
        //                     },
        //                     {
        //                         startDate: { lte: endDate },
        //                         endDate: { gte: endDate }
        //                     }
        //                 ]
        //             }
        //         }
        //     }
        // }

       // console.log('query from params: ', params);

       

        //const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/listings/allProperties', query);

        //const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/listings/queryProperties/'+userId, query);
        
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/listings/queryProperties/'+userId, params);

        return response.data;

    } catch (error) {

        console.error('Error fetching listings:', error);

        return [];

    }
};

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

export const queryBusinessListings = async (params: IBbsListingParams) => {

    console.log('running Query Business Lisings')

    const currentUser = await getCurrentUsers();

    const {

       
       
        locationValue,
       
        category

    } = params;

    
    try {
        
        const userId =  currentUser?.id;

        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL +'/api/listings/queryBusinesses/'+userId, params);

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