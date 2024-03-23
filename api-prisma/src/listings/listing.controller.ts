import { orm } from "../utils/orm.server";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { MIME_TYPE_MAP } from "../types";
import path from 'path';

type Listing = {
    id: number;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    imageSrc: string | null;
    category: string;
    userId: number;
    countryId: number;
    countryStateRegionId: number
    createdAt: Date;
    updatedAt: Date;
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
    return orm.property.findMany({
        select:{
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            category: true,
            imageSrc: true,
            price: true,
            userId: true,
            countryId: true,
            countryStateRegionId: true,
            createdAt: true,
            updatedAt: true,
        }
    })
}






export const createPropertyPhotos = async (listingData: any): Promise<ListingProptyPhoto[] | any> => {


        const files = listingData.files; // Access the uploaded files
        const body = listingData.body; // Access the body data

        const createInputs: Prisma.PropertyphotoCreateInput[] = files.map((file: any) => {
            const fileTypeExt = MIME_TYPE_MAP[file?.mimetype as keyof typeof MIME_TYPE_MAP] || '';
            
            //const destinationWithoutPublic = file?.destination.replace(/^public\//, '');
            const destinationWithoutPublic = file?.destination.replace(/^public\//, '');
            
            //const imgUrl = body?.imgUrl + '/' + relativePath + '/' + file?.filename + '.' + body?.fileTypeExt;
            const imgUrl = body?.imgUrl + '/' + destinationWithoutPublic + '/' + file?.filename;

            const fullLocalPath = path.join(process.cwd(), file?.path)
    
            return {
                imgAlbumName: file?.fieldname,
                imgFileOrigName: file?.originalname,
                imgEncoding: file?.encoding,
                imgFileType: file?.mimetype,
                imgFileOutputDir: file?.destination,
                imgFileName: file?.filename,
                //imgFilePath: file?.path,
                imgFilePath: fullLocalPath,
                imgFileSize: file?.size,
                imageSrc: body?.imageSrc,
                imgUrl: imgUrl,
                imgName: body?.imgName,
                imgCatg: body?.imgCatg,
                token: body?.token,
                property: { connect: { id: parseInt(body?.propertyId) } },
                user: { connect: { id: parseInt(body?.userId) } },
            };
        });

    //console.log('createInput JSON data: ', JSON.stringify(createInputs));

    const lastImageIndex = files.length - 1;
     const lastImageUrl = createInputs[lastImageIndex]?.imgUrl;



     // Update imageSrc for the last image
     createInputs[lastImageIndex].imageSrc = lastImageUrl;

    


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
                property: true,
            }
        })

        ));
       
        await orm.property.update({
            where: { id: parseInt(body?.propertyId) },
            data: {
                imageSrc: lastImageUrl, // Save the concatenated string           
            }
        })

    return createdPropertyPhotos;
} catch (error) {
    console.error('Error creating property photos:', error);
    return { error: 'Failed to create property photos. Please check the provided data.' };
}

};




export const getListingId = async (id: number): Promise<Listing | null> => {
    return orm.listing.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            imageSrc: true,
            category: true,
            userId: true,
            countryId: true,
            countryStateRegionId: true,
            propertyId: true,
            businessId: true,
            createdAt: true,
            updatedAt: true,
        },
    })
}




export const getListingUuId = async (uuid: string): Promise<Listing | null> => {
    return orm.listing.findUnique({
        where: {
            uuid,
        },
        select: {
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            category: true,
            imageSrc: true,
            userId: true,
            countryId: true,
            countryStateRegionId: true,
            createdAt: true,
            updatedAt: true,
        },
    })
}
