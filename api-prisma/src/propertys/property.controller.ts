import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { MIME_TYPE_MAP } from "../types";
import path from 'path';



type Property = {
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
    price: string;
    userId: number;
    countryId: number | undefined;
    countryStateRegionId: number | undefined;
    countryCityId: number |undefined;
    createdAt: Date;
}


export const listPropertys = async (): Promise<Property[]> => {
    const properties = await orm.listing.findMany({
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
            countryId: true,
            countryStateRegionId: true,
            countryCityId: true,
        }
    });

    // Map the fetched properties to match the Property type
    const mappedProperties: Property[] = properties.map(p => ({
        id: p.id,
        uuid: p.uuid,
        title: p.title,
        description: p.description,
        category: p.category,
        roomCount: p.roomCount,
        bathroomCount: p.bathroomCount,
        guestCount: p.guestCount,
        locationValue: p.locationValue,
        imageSrc: p.imageSrc,
        price: p.price,
        userId: p.userId,
        countryId: p.countryId,
        countryStateRegionId: p.countryStateRegionId || undefined, // Make optional if necessary
        countryCityId: p.countryCityId || undefined, // Make optional if necessary
        createdAt: p.createdAt,
    }));

    return mappedProperties;
}




export const createProperty = async (property: Property): Promise<Property | any> => {
    console.log('Hit Create Property Hit on line 62');

    try {
        // Convert price to a number
        const price = property.price;

        // Check if imageSrc is null or undefined
        const imageSrcString = Array.isArray(property.imageSrc) ? property.imageSrc.join(',') : '';

        // Handle the possibility of countryId, countryStateRegionId, and countryCityId being undefined
        const countryId = property.countryId !== undefined ? property.countryId : 0; // Replace 0 with a default value if needed
        const countryStateRegionId = property.countryStateRegionId !== undefined ? property.countryStateRegionId : 0;
        const countryCityId = property.countryCityId !== undefined ? property.countryCityId : 0;

        // Create the property with the correct data types
        const createdProperty = await orm.property.create({
            data: {
                title: property.title,
                description: property.description,
                category: property.category,
                roomCount: property.roomCount,
                bathroomCount: property.bathroomCount,
                locationValue: property.locationValue || 'placeholder_value',
                guestCount: property.guestCount,
                imageSrc: imageSrcString, // Save the concatenated string
                price: price, // Pass the price as a number
                userId: property.userId,
                countryId: countryId, // Include countryId
                countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                countryCityId: countryCityId, // Include countryCityId
            }
        });

        return createdProperty;
        
    } catch (error) {
        console.error('Error creating property:', error);
        return { error: 'Failed to create property. Please check the provided data.' };
    }
};


export const autoSavePropertyData = async (property: Property): Promise<Property | any> => {


    console.log("Hit autoSavePropertyData Service.ts new Controller.ts", property)
    return property;

    // const {
    //     id,
    //     uuid,
    //     title,
    //     description,
    //     category,
    //     roomCount,
    //     bathroomCount,
    //     locationValue,
    //     guestCount,
    //     imageSrc,
    //     price,
    //     userId,
    //     createdAt
    // } = listing;

    // return orm.listing.create({
    //     data: {
    //         title: listing?.title,
    //         description: listing?.description,
    //         category: listing?.category,
    //         roomCount: listing?.roomCount,
    //         bathroomCount: listing?.roomCount,
    //         locationValue: listing?.locationValue,
    //         guestCount: listing?.guestCount,
    //         imageSrc: listing?.imageSrc,
    //         price: listing?.price,
    //         userId: listing?.userId
    //     }
    // })
}