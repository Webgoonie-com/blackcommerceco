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



export const getUserIdFavorites = async (id: number, listingData: any): Promise<Listing[]> => {
    const { listingId, userId } = listingData.body;

    if (!listingId || typeof listingId !== 'number') {
        throw new Error("Invalid ListingId");
    } else {
        const favorites = await orm.favorite.findMany({
            where: {
                userId: userId,
                listingId: listingId
            },
            include: {
                // Include the associated listing for each favorite
                listing: true
            }
        });

        const listings: Listing[] = favorites.map(favorite => ({
            id: favorite.listingId ?? 0, // Provide a default value if null
            uuid: favorite.listing?.[0]?.uuid ?? null,
            token: favorite.listing?.[0]?.token ?? "",
            title: favorite.listing?.[0]?.title ?? "",
            description: favorite.listing?.[0]?.description ?? "",
            imageSrc: favorite.listing?.[0]?.imageSrc ?? null,
            category: favorite.listing?.[0]?.category ?? "",
            countryId: favorite.listing?.[0]?.countryId ?? null,
            countryStateRegionId: favorite.listing?.[0]?.countryStateRegionId ?? null,
            createdAt: favorite.listing?.[0]?.createdAt ?? new Date(),
            updatedAt: favorite.listing?.[0]?.updatedAt ?? new Date(),
            userId: favorite.userId
        }));

        return listings;
    }
}
