import { orm } from "../utils/orm.server";
import { 
    MIME_TYPE_MAP,
    ListingPropertyPhoto,
    Listing,
    Property,
    Favorite,
    
} from "../types";
import path from 'path';
import { Business, Prisma } from "@prisma/client";





export const listPropertys = async (): Promise<Property[]> => {

    
    
    return await orm.property.findMany({
        
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
            
            user: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    role: false,
                    email: false,
                    emailVerified: false,
                    hashedPassword: false,
                    image: true,
                    phone: false,
                    firstName: true,
                    lastName: true,
                    updatedAt: true,
                    createdAt: true,
                }
            },
            userId: true,
            countryId: true,
            country: { 
                select: {
                    id: true,
                    isoCode: true,
                    name: true,
                    currency: true,
                    phonecode: true,
                    flag: true,
                    latitude: true,
                    longitude: true,
                    region: true,
                    timezones: true
                }
            },
            countryStateRegionId: true,
            countryStateRegion: { 
                select: {
                    id: true,
                    isoCode: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    countryId: true
                }
            },
            countryCityId: true,
            countryCity: { 
                select: {
                    id: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    countryId: true
                }
            },
        }
    })
}

export const listQueryPropertys = async (property: any): Promise<Property[]> => {

    
    //  console.log('listQueryPropertys on Controller data for property: ', property)

    let query: any = {};

    let exisitingCountry
    
    const {

       
        roomCount,
        guestCount,
        bathroomCount,
        locationValue,
        startDate,
        endDate,
        category

    } = property;


        //  console.log('category: ', category)

        if (category) {
            query.category = category;
        }

        //  console.log('roomCount: ', roomCount)

        if (roomCount) {
            const newRoomCount  = roomCount as number

            query.roomCount = {
                gte: +newRoomCount as number
            }
        }

       //    console.log('roomCount: ', roomCount)

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount as number
            }
        }

        //  console.log('guestCount in query: ',  query)
        //  console.log('guestCount: ',  query.guestCount)

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount as number
            }
        }

        //  console.log('bathroomCount: ', bathroomCount)
        
        if (locationValue) {
            
            exisitingCountry = await orm.country.findFirst({
                where: {
                    isoCode: locationValue.toString()
                }
            });

            query.countryId = exisitingCountry?.id
        }




        if (startDate && endDate)
            {

            
                query.NOT = {

                    reservations: {
                        some: {
                            OR: [ 
                                {
                                    endDate: { gte: startDate },
                                    startDate: { lte: startDate },
                                },
                                {
                                    startDate: { lte: endDate },
                                    endDate: { gte: endDate }
                                }
                            ]
                        }
                    }
                }
        }

        

        // if(exisitingCountry){
        //     query.locationValue = exisitingCountry?.isoCode
        // }

        //  console.log('Take a peek at the query your about to use: ', query)


    
        const listQuriedProperties =  await orm.property.findMany({
            where: query,
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
                
                user: {
                    select: {
                        id: true,
                        uuid: true,
                        name: true,
                        role: false,
                        email: false,
                        emailVerified: false,
                        hashedPassword: false,
                        image: true,
                        phone: false,
                        firstName: true,
                        lastName: true,
                        updatedAt: true,
                        createdAt: true,
                    }
                },
                userId: true,
                countryId: true,
                country: { 
                    select: {
                        id: true,
                        isoCode: true,
                        name: true,
                        currency: true,
                        phonecode: true,
                        flag: true,
                        latitude: true,
                        longitude: true,
                        region: true,
                        timezones: true
                    }
                },
                countryStateRegionId: true,
                countryStateRegion: { 
                    select: {
                        id: true,
                        isoCode: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        countryId: true
                    }
                },
                countryCityId: true,
                countryCity: { 
                    select: {
                        id: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        countryId: true
                    }
                },
            },
            orderBy:{
                createdAt: 'desc'
            }
        })

        //  console.log('return', listQuriedProperties)
        
        return listQuriedProperties
}

export const listBusinesses = async (): Promise<Business[]> => {

    
    return await  orm.business.findMany({
        // where: {
        //     imageSrc: {
        //         not: null
        //     },
            
        // },
        select:{
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            category: true,
            imageSrc: true,
            imagesMultiSrc: true,
            locationValue: true,
            listingId: true,
            isAFranchise: true,
            isTheFranchiseParent: true,
            ownsOtherBusinesses: true,
            hasStore: true,
            hasProducts: true,
            hasServices: true,
            sellPrice: true,
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            userId: true,
            countryId: true,
            country: { 
                select: {
                    id: true,
                    isoCode: true,
                    name: true,
                    currency: true,
                    phonecode: true,
                    flag: true,
                    latitude: true,
                    longitude: true,
                    region: true,
                    timezones: true
                }
            },
            countryStateRegionId: true,
            countryStateRegion: { 
                select: {
                    id: true,
                    isoCode: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    countryId: true
                }
            },
            countryCityId: true,
            countryCity: { 
                select: {
                    id: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    countryId: true
                }
            },            
            createdAt: true,
            user: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    role: false,
                    email: false,
                    emailVerified: false,
                    hashedPassword: false,
                    image: true,
                    phone: false,
                    firstName: true,
                    lastName: true,
                    updatedAt: true,
                    createdAt: true,
                }
            },
            updatedAt: true,
            
            },
        
    })
}


export const listQueryBusinesses = async (businesses: any): Promise<Business[]> => {
   
    //  console.log('Hit Query String On API For Businessess')

    let query: any = {};

    let exisitingCountry

    const {

       
        
        locationValue,
        
        category

    } = businesses;

    if (category) {
            query.category = category;
    }

    if (locationValue) {
            
        exisitingCountry = await orm.country.findFirst({
            where: {
                isoCode: locationValue.toString()
            }
        });

        query.countryId = exisitingCountry?.id
    }

    const listQuriedBusinesses  = await  orm.business.findMany({
        // where: {
        //     imageSrc: {
        //         not: null
        //     },
            
        // },
        where: query,
        select:{
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            category: true,
            imageSrc: true,
            imagesMultiSrc: true,
            locationValue: true,
            listingId: true,
            isAFranchise: true,
            isTheFranchiseParent: true,
            ownsOtherBusinesses: true,
            hasStore: true,
            hasProducts: true,
            hasServices: true,
            sellPrice: true,
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            userId: true,
            countryId: true,
            country: { 
                select: {
                    id: true,
                    isoCode: true,
                    name: true,
                    currency: true,
                    phonecode: true,
                    flag: true,
                    latitude: true,
                    longitude: true,
                    region: true,
                    timezones: true
                }
            },
            countryStateRegionId: true,
            countryStateRegion: { 
                select: {
                    id: true,
                    isoCode: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    countryId: true
                }
            },
            countryCityId: true,
            countryCity: { 
                select: {
                    id: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    countryId: true
                }
            },            
            createdAt: true,
            user: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    role: false,
                    email: false,
                    emailVerified: false,
                    hashedPassword: false,
                    image: true,
                    phone: false,
                    firstName: true,
                    lastName: true,
                    updatedAt: true,
                    createdAt: true,
                }
            },
            updatedAt: true,
            
            },
            orderBy:{
                createdAt: 'desc'
            }
        
    })

    //  console.log('return', listQuriedBusinesses)
        

    return listQuriedBusinesses



}

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

    // console.log('getListingFavoriteByListingId', id)
    
    const favorites = await orm.listing.findMany({
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

    // console.log('favorite', favorite);
    

    return favorites
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

    //  console.log('createInput JSON data: ', JSON.stringify(createInputs));

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

export const addBbsistingFavoriteByListingUUId = async (uuid: string, listingData: any ): Promise<Listing[]> => {

    // console.log('addBbsistingFavoriteByListingId', uuid)
    // console.log('listingData', listingData)

    const { businessUUId, userId } = listingData.body;

    // console.log('listingId:', businessUUId);
    // console.log('userId:', userId);


    let checkForExistingFavorite
    let checkForExistingBusinessFromListing
    let checkForExistingBusiness

    if(!businessUUId || typeof businessUUId !== 'string' ){
        //console.log('listingId is not a number or dont exist', businessUUId)
        throw new Error("Invalid ListinId");
        
    }else{
        //console.log('businessUUId is a string', businessUUId)

        checkForExistingBusiness = await orm.business.findFirst({
            where: {
                uuid: businessUUId
            }
        });
    }


    // console.log("Passed to Here LEt's finad a match:", businessUUId)
    
    // console.log(" checkForExistingBusiness?.id:",  checkForExistingBusiness?.id)

    //  const { listingData } = params;

    

    checkForExistingFavorite = await orm.favorite.findFirst({
        where: {
            userId: userId,
            listingId: checkForExistingBusiness?.listingId,
            businessId: checkForExistingBusiness?.id
        }
    });

    //console.log('Line 450 Running New Check checkForExistingBusiness?.id', checkForExistingBusiness?.id)
    
    checkForExistingBusinessFromListing = await orm.listing.findFirst({
        where: {
            
            businessId: checkForExistingBusiness?.id
        }
    });

    // if(checkForExistingBusinessFromListing){
    //     console.log('checkForExistingBusinessFromListing Exist: ', checkForExistingBusinessFromListing)
    // }else{
    //     console.log('does not exist', checkForExistingBusinessFromListing)
    // }

    if(checkForExistingFavorite){
        //console.log("Match Exist:", checkForExistingBusiness?.id)
        return listingData;

    }else{
        const favoritedBusiness = await  orm.favorite.create({
            data: {
             userId: userId,
             listingId: checkForExistingBusinessFromListing?.id,
             businessId: checkForExistingBusiness?.id
            }
         })
     
         listingData = favoritedBusiness

         return listingData;  
    }


    

    
    
}

export const addBapsListingFavoriteByListingUUId = async (uuid: string, listingData: any ): Promise<Listing[]> => {

    // console.log('addBapsistingFavoriteByListingId propertyUUId', uuid)
    // console.log('listingData', listingData)

    const { propertyUUId, userId } = listingData.body;

    // console.log('propertyUUId:', propertyUUId);
    // console.log('userId:', userId);


    let checkForExistingProperty
    let checkForExistingFavorite
    let checkForExistingPropertyFromListing


    if(!propertyUUId || typeof propertyUUId !== 'string'){
       // console.log('listingId is not a number or dont exist', propertyUUId)
        throw new Error("Invalid ListinId");
        
    }else{
       // console.log('propertyUUId is a string', propertyUUId)

         checkForExistingProperty = await orm.property.findFirst({
            where: {
               
                uuid: propertyUUId
            }
        });
   


       // console.log("Passed to Here LEt's finad a match:", propertyUUId)

        //  const { listingData } = params;

        checkForExistingFavorite = await orm.favorite.findFirst({
        where: {
            userId: userId,
            listingId: checkForExistingProperty?.listingId,
            propertyId: checkForExistingProperty?.id
        }
        });

     }

    //  console.log('Line 515 Running New Check checkForExistingProperty?.id', checkForExistingProperty?.id)

    checkForExistingPropertyFromListing = await orm.listing.findFirst({
        where: {
            
            propertyId: checkForExistingProperty?.id
        }
    });

    // if(checkForExistingPropertyFromListing){
    //     console.log('checkForExistingPropertyFromListing Exist: ', checkForExistingPropertyFromListing)
    // }else{
    //     console.log('does not exist', checkForExistingPropertyFromListing)
    // }

    if(checkForExistingFavorite){
        //  console.log("Match Exist:", checkForExistingPropertyFromListing?.id)
        return listingData;

    }else{
        const listings = await  orm.favorite.create({
            data: {
             userId: userId,
             listingId: checkForExistingPropertyFromListing?.id,
             propertyId: checkForExistingProperty?.id,
            }
         })
     
         listingData = listings

         return listingData;  
    }


    

    
    
}

export const delBapsListingFavoriteByListingId = async (uuid: string, listingData: any): Promise<Favorite[]> => {
    

    //  console.log('LINE 583 Hit Delete Propety Favorite', uuid)

    const existingProperty = await orm.property.findFirst({
        where: {
            uuid: uuid,
            
        },
        select: {
            id: true,
            uuid: true,
            userId: true,
            listingId: true,
            
            
        }
    });
    

    if(!existingProperty){
        throw new Error("existingProperty don't Exist");
        
    }

    

    const existingfavoritedProperty = await orm.favorite.findFirst({
        where: {
            userId: listingData?.userId,
            listingId: existingProperty?.listingId,
            propertyId: existingProperty.id,
        },
        select: {
            id: true,
            uuid: true,
            userId: true,
            listingId: true,
            propertyId: false,
            business: true,
        }
    });

    if(!existingfavoritedProperty){
        throw new Error("existingfavoritedProperty don't Exist");
        
    }else{

        const deleteExistingReservation = await orm.favorite.delete({
            where: {
              id: existingfavoritedProperty.id,
            },
          })

         return [deleteExistingReservation as any]
    }

}

export const delBbsListingFavoriteByListingId = async (uuid: string, listingData: any): Promise<Favorite[]> => {
    

    const existingdBusiness = await orm.business.findFirst({
        where: {
            uuid: uuid,
            
        },
        select: {
            id: true,
            uuid: true,
            userId: true,
            listingId: true,
        }
    });

    if(!existingdBusiness){
        throw new Error("existingdBusiness don't Exist");
        
    }

    const existingfavoritedBusiness = await orm.favorite.findFirst({
        where: {
            userId: listingData?.userId,
            listingId: existingdBusiness?.listingId,
            businessId: existingdBusiness.id,
        },
        select: {
            id: true,
            uuid: true,
            userId: true,
            listingId: true,
            propertyId: false,
            business: true,
        }
    });

    if(!existingfavoritedBusiness){
        throw new Error("existingfavoritedBusiness don't Exist");
        
    }else{

        const deleteExitingReservation = await orm.favorite.delete({
            where: {
              id: existingfavoritedBusiness.id,
            },
          })

         return [deleteExitingReservation as any]
    }


}

export const delBapsListingByListingId = async (id: number, listingData: any): Promise<Favorite[]> => {
    

    

    const favoritedBusiness = await orm.favorite.create({
        data: {
            userId: listingData?.userId,
            listingId: listingData?.listingId,
            businessId: listingData?.listingId, // This seems like it should be businessId instead of listingId
            propertyId: listingData?.propertyId,
        },
        select: {
            id: true,
            uuid: true,
            userId: true,
            listingId: true,
            propertyId: false,
            business: true,
        }
    });

    return [favoritedBusiness as any]; // Return the created listing as an array
}

// export const deleteListingFavoriteByListingId = async (id: number): Promise<Favorite[]> => {
    
//     console.log('// Fetch the favorites to be deleted')

//     const favoritesToDelete = await orm.favorite.findMany({
//         where: { id: id },
//     });


//     if(favoritesToDelete){

//         // Delete the favorites
//         await orm.favorite.delete({
//             where: { id: id },
//         });

//     }

//     // Return the deleted favorites
//     return favoritesToDelete;
// }
