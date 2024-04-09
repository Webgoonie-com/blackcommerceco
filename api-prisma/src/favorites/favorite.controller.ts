import { Favorite } from "@prisma/client";
import { orm } from "../utils/orm.server";
import { FavoriteBusinesses, FavoritePropertys, Listing } from "../types";



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
            favoriteId: true,
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

export const getuserPropertyFavorites = async (userId: number): Promise<FavoritePropertys | null > => {
    
    

    if (!userId || typeof userId !== 'number') {
        throw new Error("Invalid uuid");
    }

    

    // if (!findExitingPropertyFirst ) {
    //     throw new Error("Poperty Not Found");
    // }



    const propertyFavorites = await orm.favorite.findMany({
        where: {
            userId: userId,
            propertyId: {
                not: null
            }
        },
        include: {
            listing: true,
            property: true
        },
        
    });

    return propertyFavorites as any;
}

export const getuserBusinessFavorites = async (userId: number): Promise<FavoriteBusinesses | null > => {
    
    

    if (!userId || typeof userId !== 'number') {
        throw new Error("Invalid uuid");
    }

    

    // if (!findExitingPropertyFirst ) {
    //     throw new Error("Poperty Not Found");
    // }



    const businessFavorites = await orm.favorite.findMany({
        where: {
            userId: userId,
            businessId: {
                not: null
            }
        },
        include: {
            listing: true,
            business: true
        },
        
    });

    return businessFavorites as any;
}