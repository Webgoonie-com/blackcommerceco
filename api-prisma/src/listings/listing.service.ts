import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client'; // Import Prisma types


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
    listingId: number | null;
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

export const createPropertyPhotos = async (listingData: any): Promise<ListingProptyPhoto[] | any> => {
    console.log('Hit Create Property Photos', listingData);

    const files = listingData.files; // Access the uploaded files
    const body = listingData.body; // Access the body data

    console.log('files:', files);
    console.log('body:', body);

    const createInputs: Prisma.PropertyphotoCreateInput[] = files.map((file: any) => ({
        imgAlbumName: file.fieldname || '',
        imgFileOrigName: file.originalname || '',
        imgEncoding: file.encoding || '',
        imgFileType: file.mimetype || '',
        imgFileOutputDir: file.destination || '',
        imgFileName: file.filename || '',
        imgFilePath: file.path || '',
        imgFileSize: file.size || 0,

        imageSrc: body.imageSrc || '', // Assuming imageSrc is passed in the body
        imgUrl: body.imgUrl || '', // Assuming imgUrl is passed in the body
        imgName: body.imgName || '', // Assuming imgName is passed in the body
        imgCatg: body.imgCatg || '', // Assuming imgCatg is passed in the body
        user: { connect: { uuid: body.user || 0 } }, // Assuming user is passed in the body

    }));

    console.log('createInput JSON data: ', JSON.stringify(createInputs));

    try {
        const createdPropertyPhotos = await Promise.all(createInputs.map(createInput =>
            orm.propertyphoto.create({
                data: createInput,
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
        return error;
    }
};


