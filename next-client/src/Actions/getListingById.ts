// actions/getListings.ts
import axios from 'axios';

interface IParams {
    listingUuid?: string;
}

export default async function getListingByUuId(
    params: IParams
){
    const { listingUuid } = params;

    console.log('Line 13 on getListyingbyid  params: ', params)
    console.log('Line 14 on getListyingbyid  listingId: ', listingUuid)

    try {
        //const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'api/listings/propertyuuid/'+listingUuid);
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/propertyuuid/'+listingUuid);

        console.log('Line 16 getListingById.ts /listingsbyid/ response: ', response.data)

        if(!response){
            return null
        }
        
        return response.data; // Assuming the API returns an array of listings
    } catch (error) {
        console.error('Error fetching listings:');
        return []; // Return an empty array or handle the error as needed
    }
}


export const getPropertyListingByUuId = async function getListingByUuId(
    params: IParams   
){
    const { listingUuid } = params;

    console.log('Line 13 on getListyingbyid  params: ', params)
    console.log('Line 14 on getListyingbyid  listingId: ', listingUuid)

    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/propertyuuid/'+listingUuid);

        console.log('Line 16 getListingById.ts /listingsbyid/ response: ', response.data)

        if(!response){
            return null
        }
        
        return response.data; // Assuming the API returns an array of listings
    } catch (error) {
        console.error('Error fetching listings:');
        return []; // Return an empty array or handle the error as needed
    }
};
export const getBusinessListingByUuId = async function  getBusinessListingUuId(
    params: IParams   
){
    const { listingUuid } = params;

    console.log('Line 13 on getListyingbyid  params: ', params)
    console.log('Line 14 on getListyingbyid  listingId: ', listingUuid)

    try {
        
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/businessuuid/'+listingUuid);

        console.log('Line 16 getListingById.ts /listingsbyid/ response: ', response.data)

        if(!response){
            return null
        }
        
        return response.data; // Assuming the API returns an array of listings
    } catch (error) {
        console.error('Error fetching listings:');
        return []; // Return an empty array or handle the error as needed
    }
};




