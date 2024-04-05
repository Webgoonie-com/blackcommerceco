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






export const getUserIdFavorites = async (userId: number): Promise<Favorite[]> => {
    
    

    if (!userId || typeof userId !== 'number') {
        throw new Error("Invalid userId");
    }

    const favorites = await orm.favorite.findMany({
        where: {
            userId: userId,
        },
        include: {
            listing: true
        }
    });

    return favorites;
}