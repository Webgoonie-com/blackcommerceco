import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";



type Listing = {
    id: number;
    uuid: string | null;
    title: string;
    description: string;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string;
    imageSrc: string;
    price: number;
    userId: number;
    createdAt: Date;
}


type ListingProptyPhoto = {

}

export const listPropertys = async (): Promise<Listing[]> => {
    return orm.listing.findMany({
        select:{
            id: true,
            uuid: true,
            title: true,
            description: true,
            category: true,
            roomCount: true,
            bathroomCount: true,
            locationValue: true,
            guestCount: true,
            imageSrc: true,
            price: true,
            userId: true,
            createdAt: true,
        }
    })
}


export const createProperty = async (listing: Listing): Promise<Listing | any> => {

    const {
        id,
        uuid,
        title,
        description,
        category,
        roomCount,
        bathroomCount,
        locationValue,
        guestCount,
        imageSrc,
        price,
        userId,
        createdAt
    } = listing;

    return orm.listing.create({
        data: {
            title: listing?.title,
            description: listing?.description,
            category: listing?.category,
            roomCount: listing?.roomCount,
            bathroomCount: listing?.roomCount,
            locationValue: listing?.locationValue,
            guestCount: listing?.guestCount,
            imageSrc: listing?.imageSrc,
            price: listing?.price,
            userId: listing?.userId
        }
    })
}

export const createPropertyPhotos = async (listing: ListingProptyPhoto): Promise<ListingProptyPhoto | any> => {

    console.log('Hit Create Property Photos', listing)


    return listing


}
