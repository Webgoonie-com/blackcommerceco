import { orm } from "../utils/orm.server";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { 
    MIME_TYPE_MAP,
    ListingPropertyPhoto,
    Listing,
    Property,
    
} from "../types";
import path from 'path';










export const listPropertys = async (): Promise<Property[]> => {

    
    
    return orm.property.findMany({
        
        select:{
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            imageSrc: true,
            imagesMultiSrc: true,

            category: true,
            roomCount: true,
            bathroomCount: true,
            guestCount: true,
            locationValue: true,
            price: true,
            
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            createdAt: true,
            updatedAt: true,
            
            user: true,
            userId: true,
            
            countryId: true,
            countryStateRegionId: true,
            countryCityId: true,
        }
    })
}

export const listBusinesses = async (): Promise<Listing[]> => {
    return orm.business.findMany({
        where: {
            imageSrc: {
                not: null
            }
        },
        
    })
}







export const createPropertyPhotos = async (listingData: any): Promise<ListingPropertyPhoto[] | any> => {


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

     console.log('suppose to be the last image instead of an array lastImageUrl: ', lastImageUrl)
    


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
            id: id,
        },
    })
}




export const getListingUuId = async (uuid: string): Promise<Listing | null> => {
    
    return orm.listing.findUnique({
        where: {
            uuid: uuid.toString(),
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

export const getPropertyListingUuId = async (uuid: string): Promise<Listing | null> => {
    
    const findProperty =  await orm.property.findUnique({
        where: {
            uuid,
        },
        select:{
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            imageSrc: true,
            imagesMultiSrc: true,

            category: true,
            roomCount: true,
            bathroomCount: true,
            guestCount: true,
            locationValue: true,
            price: true,
            
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            createdAt: true,
            updatedAt: true,
            
            user: true,
            userId: true,
            
            countryId: true,
            countryStateRegionId: true,
            countryCityId: true,
        }
    })

    //console.log('return findProperty', findProperty)

    return findProperty
}

export const getBusinessListingUuId = async (uuid: string): Promise<Listing | null> => {
    
    return orm.business.findUnique({
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




export const getListingFavoriteByListingId = async (id: number): Promise<Listing[]> => {

    console.log('getListingFavoriteByListingId', id)
    
    const favorite = await orm.listing.findMany({
        where: { id: id},
        select:{
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
        }
    })

    // handle the favorite logic

    console.log('favorite', favorite);
    

    return favorite
}


export const deleteListingFavoriteByListingId = async (id: number): Promise<Listing[]> => {

    console.log('deleteListingFavoriteByListingId', id)

    const listings = await  orm.listing.findMany({
        where: { id: id},
        select:{
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
        }
    })

    
    return listings;
}
