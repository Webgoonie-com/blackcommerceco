import { Favorite } from "@prisma/client";
import { orm } from "../utils/orm.server";
import { Listing } from "../types";



export const listFavorites = async (): Promise<Favorite[]> => {
    return await  orm.favorite.findMany({
        where: {
            businessId: {
                not: null
            },
            listingId: {
                not: null
            },
            // propertyId: {
            //     in: null
            // },
            
        },
        select:{
            id: true,
            uuid: true,
            userId: true,
            listingId: true,
            listing: true,
            propertyId: true,
            createdAt: true,
            updatedAt: true,
            business: true,
            businessId: true,
           
            
            },
        
    })
}



export const getUserIdFavorites = async (id: number, listingData: any ): Promise<Listing[]> => {

    console.log('addListingFavoriteByListingId', id)
    console.log('listingData', listingData)

    const { listingId, userId } = listingData.body;

    console.log('listingId:', listingId);
    console.log('userId:', userId);


    if(!listingId || typeof listingId !== 'number'){
        console.log('listingId is not a number or dont exist', listingId)
        throw new Error("Invalid ListinId");
        
    }else{
        console.log('listingId is a number', listingId)
    }


    console.log("Passed to Here LEt's finad a match:", listingId)

    //  const { listingData } = params;

    // const listings = await  orm.favorite.create({
    //    data: {
    //     userId: userId,
    //    }
    // })

    
    return listingData;
}