import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { MIME_TYPE_MAP } from "../types";
import path from 'path';

type Listing = {
    countryStateRegionId: any;
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
    countryId: number;
    createdAt: Date;
}


type ListingProptyPhoto = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
    imageSrc: string | null;
    imgCatg: string | null;
    imgName: string | null;
    userId: number;
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
            countryId: true,
            countryStateRegionId: true,
            createdAt: true,
        }
    })
}



export const createProperty = async (listing: Listing): Promise<Listing | any> => {
    console.log('Hit Create Property Hit on line 62');

    try {
        // Convert price to a number
        const price = listing.price;

        // Check if imageSrc is null or undefined
        const imageSrcString = Array.isArray(listing.imageSrc) ? listing.imageSrc.join(',') : '';

        // Handle the possibility of countryId, countryStateRegionId, and countryCityId being undefined
        const countryId = listing.countryId !== undefined ? listing.countryId : 0; // Replace 0 with a default value if needed
        const countryStateRegionId = listing.countryStateRegionId !== undefined ? listing.countryStateRegionId : 0;
        const countryCityId = listing.countryId !== undefined ? listing.countryId : 0;

        // Create the property with the correct data types
        const createdProperty = await orm.property.create({
            data: {
                title: listing.title,
                description: listing.description,
                category: listing.category,
                roomCount: listing.roomCount,
                bathroomCount: listing.bathroomCount,
                locationValue: listing.locationValue || 'placeholder_value',
                guestCount: listing.guestCount,
                imageSrc: imageSrcString, // Save the concatenated string
                price: price, // Pass the price as a number
                userId: listing.userId,
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


export const createPropertyPhotos = async (listingData: any): Promise<ListingProptyPhoto[] | any> => {
    console.log('Hit Create Property Photos', listingData);

    const files = listingData.files; // Access the uploaded files
    const body = listingData.body; // Access the body data

    console.log('files:', files);
    console.log('body:', body);





        const createInputs: Prisma.PropertyphotoCreateInput[] = files.map((file: any) => {
            const fileTypeExt = MIME_TYPE_MAP[file?.mimetype as keyof typeof MIME_TYPE_MAP] || '';
            
            //const destinationWithoutPublic = file?.destination.replace(/^public\//, '');
            const destinationWithoutPublic = file?.destination.replace(/^public\//, '');
            
            //const imgUrl = body?.imgUrl + '/' + relativePath + '/' + file?.filename + '.' + body?.fileTypeExt;
            const imgUrl = body?.imgUrl + '/' + destinationWithoutPublic + '/' + file?.filename;
    
            return {
                imgAlbumName: file?.fieldname,
                imgFileOrigName: file?.originalname,
                imgEncoding: file?.encoding,
                imgFileType: file?.mimetype,
                imgFileOutputDir: file?.destination,
                imgFileName: file?.filename,
                imgFilePath: file?.path,
                imgFileSize: file?.size,
                imageSrc: body?.imageSrc,
                imgUrl: imgUrl,
                imgName: body?.imgName,
                imgCatg: body?.imgCatg,
                user: { connect: { id: parseInt(body?.userId) } },
            };
        });

    console.log('createInput JSON data: ', JSON.stringify(createInputs));

    try {
    const createdPropertyPhotos = await Promise.all(createInputs.map(createInput =>
        orm.propertyphoto.create({
            data: {
                ...(createInput as Prisma.PropertyphotoCreateInput),
            },
            select: {
                id: true,
                uuid: true,
                imgUrl: true,
                imageSrc: true,
                createdAt: true,
            }
        })
    ));

    return createdPropertyPhotos;
} catch (error) {
    console.error('Error creating property photos:', error);
    return { error: 'Failed to create property photos. Please check the provided data.' };
}

};


