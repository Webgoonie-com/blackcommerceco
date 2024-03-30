// actions/getListings.ts
import axios from 'axios';

interface IParams {
    listingUuid?: string;
}

export default async function getListingByUuId(
    params: IParams
){
    const { listingUuid } = params;

    

    try {
    
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/listings/propertyuuid/'+listingUuid);

        if(!response){
            return null
        }
        
        return response.data

    } catch (error) {

        console.error('Error fetching listings:');

        return [];

    }
}


export const getPropertyListingByUuId = async function getListingByUuId(
    params: IParams   
){
    const { listingUuid } = params;

    try {

        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/propertys/uuid/'+listingUuid);

        if(!response){
            return null
        }
        
        return response.data

    } catch (error) {

        console.error('Error fetching listings:');

        return [];

    }

};

export const getBusinessListingByUuId = async function  getBusinessListingUuId(
    params: IParams   
){

    const { listingUuid } = params;

    try {
        
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL +'/api/businesses/uuid/'+listingUuid);

        if(!response){
            return null
        }
        
        return response.data

    } catch (error) {
        
        console.error('Error fetching listings:');

        return [];

    }
};




