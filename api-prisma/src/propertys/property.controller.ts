import { orm } from "../utils/orm.server";
import { Prisma } from '@prisma/client';
import { Listing, MIME_TYPE_MAP, Property, PropertyPhoto, PropertyReservation } from "../types";
import path from 'path';
import { unlink } from "fs/promises";






export const listPropertys = async (): Promise<Property[]> => {


    const properties = await orm.property.findMany({
        select:{
            id: true,
            uuid: true,
            title: true,
            token: true,
            description: true,
            category: true,
            roomCount: true,
            bathroomCount: true,
            locationValue: true,
            guestCount: true,
            imageSrc: true,
            imagesMultiSrc: true,
            price: true,
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            userId: true,
            createdAt: true,
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
        
    });

    // Map the fetched properties to match the Property type
    const mappedProperties: Property[] = properties.map(p => ({
        id: p.id,
        uuid: p.uuid,
        title: p.title,
        token: p.token,
        description: p.description,
        category: p.category,
        roomCount: p.roomCount,
        bathroomCount: p.bathroomCount,
        guestCount: p.guestCount,
        locationValue: p.locationValue,
        imageSrc: p.imageSrc,
        imagesMultiSrc: p.imagesMultiSrc,
        price: p.price,
        userId: p.userId,
        streetAddress: p.streetAddress,
        streetAddress2: p.streetAddress2,
        streetCity: p.streetCity,
        streetZipCode: p.streetZipCode,
        countryId: p.countryId,
        countryStateRegionId: p.countryStateRegionId || undefined, // Make optional if necessary
        countryCityId: p.countryCityId || undefined, // Make optional if necessary
        createdAt: p.createdAt,
    }));

    return mappedProperties;
}

export const getPropertyId = async (id: number): Promise<Property | null> => {
    try {
        const properties = await orm.property.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                uuid: true,
                token: true,
                title: true,
                description: true,
                category: true,
                roomCount: true,
                bathroomCount: true,
                guestCount: true,
                locationValue: true,
                imageSrc: true,
                imagesMultiSrc: true,
                price: true,
                streetAddress: true,
                streetAddress2: true,
                streetCity: true,
                streetZipCode: true,
                userId: true,
                countryId: true,
                countryStateRegionId: true,
                countryCityId: true,
                country: true,
                countryStateRegion: true,
                countryCity: true,
                createdAt: true,
            },
        });

        return properties;
    } catch (error) {
        console.log('Error', error);
        // Return null or rethrow the error
        throw error; // Rethrow the error
        // return null; // Or return null
    }
};

export const getPropertyUuidReservations = async (uuid: string): Promise<Property | null> => {
    
    console.log('Hit getPropertyReservationUuId from  "/reservationsproperty/:uuid": ', uuid)
    
    return orm.property.findUnique({
        
        where: {
            uuid,
        },
        
        
    })
}

export const getReservationByUuId = async (uuid: string): Promise<PropertyReservation | null> => {
    
    console.log('Hit getPropertyReservationUuId from  "/reservationsproperty/:uuid": ', uuid)
    
    return orm.reservationProperty.findUnique({
        
        where: {
            uuid,
        },
        select: {
            id: true,
            uuid: true,
            startDate: true,
            endDate: true,
            totalPrice: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            listingId: true,
            propertyId: true,
        }
        
    })
}

export const getPropertyUuId = async (uuid: string): Promise<Property | null> => {
    
    console.log('Hit getPropertyUuId: ', uuid)
    
    return orm.property.findUnique({
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

export const autoSavePropertyData = async (property: Property, listing: Listing): Promise<Property | any> => {


    //console.log("Hit autoSavePropertyData Service.ts new Controller.ts", property)

    //return property;

        const price = property.price.toString();

        const imageSrcString = Array.isArray(property.imageSrc) ? property.imageSrc.join(',') : '';

        const newLocationValue = Array.isArray(property.locationValue) ? property.locationValue.join(',') : '';
        
        const autoSaveToken = property?.token
        //console.log('Line 142 autoSaveToken', autoSaveToken)

        const { token } = property;

        //console.log('Line 146 autoSaveToken', token)

        let autoSaveCreateUpdateProperty
        let createdListing
        let existingListing
        let updatedProperty
        var existingProperty
        var existingProperty2

        // Begin Country CountryState CountryCity Ripped

        let existingCountry
        let existingCountryStateRegion
        let existingCountryCity

        if(property.country){

            //console.log('Begin To Rip Out Country ON Insert Update',  property.country)

            

            existingCountry = await orm.country.findFirst({
                where: {
                    isoCode: property.country?.isoCode,
                    value: property.country?.value,
                }
            });

            //console.log('1 Existing Country: ', existingCountry)

            if(!existingCountry){
                //console.log("It's time to Create A New Country: ", existingCountry)
                console.log("It's time to Create A New Country: ")

                const neWCreateCountryLatlng = `${property.country?.latitude},${property.country?.longitude}`;

                // const user = await prisma.user.create({
                //     data: {
                //       name: 'Alice',
                //       email: 'alice@prisma.io',
                //     },
                //   })

                try {
                    
                    
                    existingCountry = await orm.country.create({
                        data: {
                            isoCode: property.country?.isoCode,
                            value: property.country?.value,
                            label: property.country?.label,
                            currency: property.country?.currency,
                            phonecode: property.country?.phonecode,
                            flag: property.country?.flag,
                            latlng: neWCreateCountryLatlng,
                            latitude: property.country?.latitude.toString(),
                            longitude: property.country?.longitude.toString(),
                            region: property.country?.region,
                            name: property.country?.name,
                        },
                    });



                    console.log("newCountry", existingCountry)


                } catch (error) {
                    console.log("error", error)
                }

            }

            //console.log("2 Ater it's all said and done on country", existingCountry)


        }


        if (property.countryStateRegion) {
            //console.log("Let's Begin  countryStateRegion ", property.countryStateRegion);
        
            existingCountryStateRegion = await orm.countryStateRegion.findFirst({
                where: {
                    isoCode: property.countryStateRegion?.isoCode,
                    value: property.countryStateRegion?.value,
                }
            });
        
            //console.log('1 existingCountryStateRegion', existingCountryStateRegion);
        
            const neWCreateCountryStateRegionLatlng = `${property.countryStateRegion?.latitude},${property.countryStateRegion?.longitude}`;
        
            if (!existingCountryStateRegion) {
                try {
                    existingCountryStateRegion = await orm.countryStateRegion.create({
                        data: {
                            isoCode: property.countryStateRegion?.isoCode,
                            value: property.countryStateRegion?.value,
                            label: property.countryStateRegion?.label,
                            name: property.countryStateRegion?.name,
                            latlng: neWCreateCountryStateRegionLatlng,
                            latitude: property.countryStateRegion?.latitude.toString(),
                            longitude: property.countryStateRegion?.longitude.toString(),
                            country: {
                                connect: { id: existingCountry?.id } // Connect to the associated country
                            },
                            // countryCity: {
                            //     connect: { id: property.countryCityId } // Connect to the associated country city
                            // }
                            // countryCity:  property.countryCityId ? {
                            //     connect: { id: property.countryCityId } // Connect to the associated country city
                            // } : null
                        },
                    });
        
                    console.log("new existingCountryStateRegion", existingCountryStateRegion);
                } catch (error) {
                    console.log("error", error);
                }
            }
        }

        if(property.countryCity) {

            console.log("countryCity damnit", property.countryCity)

            existingCountryCity = await orm.countryCity.findFirst({
                where: {
                    countryCode: property.countryCity?.countryCode,
                    value: property.countryCity?.value,
                }
            });


            console.log("1 countryCity existingCountryCity", existingCountryCity)

            if(!existingCountryCity){

                console.log('Creating CountryCity')
                
                const neWCountryCodeLatlng = `${property.countryCity?.latitude},${property.countryCity?.longitude}`;

                try {
                    existingCountryStateRegion = await orm.countryCity.create({
                        data: {
                            value: property.countryCity?.value,
                            label: property.countryCity?.label,
                            name: property.countryCity?.name,
                            countryCode: property.countryCity?.countryCode,
                            latlng: neWCountryCodeLatlng,
                            latitude: property.countryCity?.latitude.toString(),
                            longitude: property.countryCity?.longitude.toString(),
                            country: {
                                connect: { id: existingCountry?.id } // Connect to the associated country
                            },
                            countryStateRegion: {
                                connect: { id: existingCountryStateRegion?.id } // Connect to the associated country city
                            }
                        },
                    });
        
                    console.log("new existingCountryStateRegion", existingCountryStateRegion);
                } catch (error) {
                    console.log("error", error);
                }

            }




        }

        console.log("Well ?????")


        // Handle the possibility of countryId, countryStateRegionId, and countryCityId being undefined
        // const countryId = property.countryId !== undefined ? property.countryId : 0; // Replace 0 with a default value if needed
        // const countryStateRegionId = property.countryStateRegionId !== undefined ? property.countryStateRegionId : 0;
        // const countryCityId = property.countryCityId !== undefined ? property.countryCityId : 0;


       
        
        // End Country CountryState CountryCity Ripped


        // Begin Listing And Propety

        console.log('Do you have autoSaveToken: ', autoSaveToken)

        console.log("what is? existingProperty b4: ", existingProperty)

        try {
            

            existingProperty = await orm.property.findFirst({
                where: {
                    token: autoSaveToken,
                    userId: parseInt(property.userId as any)
                }
            });

        } catch (error) {   
                console.log('Line 936 on existingProperty Error', error)
        }


        console.log("Wassup Now? existingProperty: ", existingProperty)

        existingListing = await orm.listing.findFirst({
            where: {
                token: autoSaveToken,
                userId: parseInt(property.userId as any)
            }
        });

        console.log('Line 754 existingListing', existingListing)
        console.log('Line 755 existingProperty', existingProperty)

        

        if (existingProperty) {

            console.log('Line 761 updating Property')

            try {

                // If property exists, update it
               // updatedProperty = await orm.property.update({

                autoSaveCreateUpdateProperty = await orm.property.update({
                    where: { id: existingProperty.id },
                    data: {
                        title: property.title,
                        token: property.token || token,
                        description: property.description,
                        category: property.category,
                        roomCount: property.roomCount,
                        bathroomCount: property.bathroomCount,
                        locationValue: newLocationValue,
                        guestCount: property.guestCount,
                        //imageSrc: imageSrcString, // Save the concatenated string
                        price: price, // Pass the price as a number
                        streetAddress: property.streetAddress,
                        streetAddress2: property.streetAddress2,
                        streetCity: property.streetCity,
                        streetZipCode: property.streetZipCode,
                        userId: property.userId,
                        listingId: existingListing?.id,
                        countryId: existingCountry?.id, // Include countryId
                        countryStateRegionId: existingCountryStateRegion?.id, // Include countryStateRegionId
                        countryCityId: existingCountryCity?.id, // Include countryCityId
                    }
                });

                
                //return updatedProperty;          
                
            } catch (error) {
                console.log('Error', error);
            }

        } else {
           
            // If property doesn't exist, create it
            console.log('Property Creation attempt')

            try {
                
           
                autoSaveCreateUpdateProperty = await orm.property.create({
                    data: {
                        title: property.title,
                        token: property.token || token,
                        description: property.description,
                        category: property.category,
                        roomCount: property.roomCount,
                        bathroomCount: property.bathroomCount,
                        locationValue: newLocationValue,
                        guestCount: property.guestCount,
                        //imageSrc: imageSrcString, // Save the concatenated string
                        price: price, // Pass the price as a number
                        streetAddress: property.streetAddress,
                        streetAddress2: property.streetAddress2,
                        streetCity: property.streetCity,
                        streetZipCode: property.streetZipCode,
                        userId: property.userId,
                        countryId: existingCountry?.id || 0, // Include countryId
                        countryStateRegionId: existingCountryStateRegion?.id || 0, // Include countryStateRegionId
                        countryCityId: existingCountryCity?.id || 0, // Include countryCityId
                    },
                    select: {
                        id: true,
                        uuid: true,
                        title: true,
                        token: true,
                        description: true,
                        category: true,
                        roomCount: true,
                        bathroomCount: true,
                        locationValue: true,
                        guestCount: true,
                        imageSrc: true,
                        price: true,
                        streetAddress: true,
                        streetCity: true,
                        streetZipCode: true,
                        userId: true,
                        countryId: true,
                        countryStateRegionId: true,
                        countryCityId: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                });

            //return autoSaveCreateUpdateProperty;

            } catch (error) {
                console.log('Error', error);
            }
        }


        existingListing = await orm.listing.findFirst({
            where: {
                token: autoSaveToken || token,
                userId: parseInt(property.userId as any)
            }
        });

        console.log('Line 452 existingListing', existingListing)

        if(!existingProperty){

            return new Error("Uncessfull Property Exist");
            

        }

        if(!existingListing && existingProperty){

            try {
                
                console.log('Line 455 try creating existingListing')

                createdListing = await orm.listing.create({
                    data: {
                        title: listing.title,
                        token: listing.token || token,
                        description: listing.description,
                        category: listing.category,
                        imageSrc: imageSrcString, // Save the concatenated string
                        userId: listing.userId,
                        propertyId: existingProperty?.id,
                        countryId: existingCountry?.id || 0, // Include countryId
                        countryStateRegionId: existingCountryStateRegion?.id || 0, // Include countryStateRegionId
                        countryCityId: existingCountryCity?.id || 0, // Include countryCityId
                    },
                    select: {
                        id: true,
                        uuid: true,
                        title: true,
                        token: true,
                        description: true,
                        category: true,
                        imageSrc: true,
                        userId: true,
                        countryId: true,
                        countryStateRegionId: true,
                        countryCityId: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                });

                //return createdListing;

            } catch (error) {
                console.log('Error', error);
            }
        }else{

            console.log('Line 497 try Updating existingListing existingListing')

            try {
                
                createdListing = await orm.listing.update({
                    where: { id: existingListing?.id},
                    data: {
                        title: listing.title,
                        token: listing.token || token,
                        description: listing.description,
                        category: listing.category,
                        //imageSrc: imageSrcString, // Save the concatenated string
                        userId: listing.userId,
                        propertyId: existingProperty?.id,
                        countryId: existingCountry?.id || 0, // Include countryId
                        countryStateRegionId: existingCountryStateRegion?.id || 0, // Include countryStateRegionId
                        countryCityId: existingCountryCity?.id || 0, // Include countryCityId
                    }
                });

                //return updatedListing;
            } catch (error) {
                console.log('Error on Updateing Listing')
            }

        }



        // Run Control Over Countries countryStateRegion countryCity
        // Later Run Location Of actual geo reverse address with street name and zip code targete ghana africa.


        //  return createdListing

        console.log('End autoSaveCreateUpdateProperty: ', autoSaveCreateUpdateProperty);
        return autoSaveCreateUpdateProperty;




        ///Let's do some more updating and checking.-mb-10


}

export const createProperty = async (property: Property): Promise<Property | any> => {
    

        console.log('property: ', property)

        let autoSaveCreateUpdateProperty

        const price = property.price.toString();

        const imageSrcString = Array.isArray(property.imageSrc) ? property.imageSrc.join(',') : '';
        
        const newLocationValue = Array.isArray(property.locationValue) ? property.locationValue.join(',') : '';

        const autoSaveToken = property?.token

        const { token } = property;

        const existingProperty = await orm.property.findFirst({
            where: {
                token: autoSaveToken || token,
                userId: parseInt(property.userId as any)
            }
        });

        if (existingProperty) {

            try {

                // If property exists, update it
                const updatedProperty = await orm.property.update({
                    where: { id: existingProperty.id },
                    data: {
                        title: property.title,
                        token: property.token,
                        description: property.description,
                        category: property.category,
                        roomCount: property.roomCount,
                        bathroomCount: property.bathroomCount,
                        locationValue: newLocationValue,
                        guestCount: property.guestCount,
                        price: price,
                        streetAddress: property.streetAddress,
                        streetAddress2: property.streetAddress2,
                        streetCity: property.streetCity,
                        streetZipCode: property.streetZipCode,
                        userId: property.userId,
                    }
                });


                autoSaveCreateUpdateProperty  = updatedProperty;          
                
            } catch (error) {
                console.log('Error', error);
            }

        } 


        return autoSaveCreateUpdateProperty
};

export const createPropertyPhotos = async (propertyData: any): Promise<PropertyPhoto[] | any> => {
    

        const files = propertyData.files
        const body = propertyData.body

        const createInputs: Prisma.PropertyphotoCreateInput[] = files.map((file: any) => {
            const fileTypeExt = MIME_TYPE_MAP[file?.mimetype as keyof typeof MIME_TYPE_MAP] || '';
                        
            const destinationWithoutPublic = file?.destination.replace(/^public\//, '');
            
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

    const lastImageIndex = files.length - 1;
    const lastImageUrl = createInputs[lastImageIndex].imgUrl;

     // Update imageSrc for the last image
     createInputs[lastImageIndex].imageSrc = lastImageUrl;

   

    try {
    const saveMultipleUploadPropertyPhotos = await Promise.all(createInputs.map(createInput =>
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

    await orm.property.update({
        where: { id: parseInt(body?.propertyId) },
        data: {
            imageSrc: lastImageUrl,
        }
    });

    

    return saveMultipleUploadPropertyPhotos;
} catch (error) {

    return { error: 'Failed to create property photos. Please check the provided data.' };
}

};



export const createPropertyReservation = async (propertyReservationData: any): Promise<any> => {
    
    if (!propertyReservationData) {
        throw new Error("PropertyReservationData is missing");
    }

    try {
        
        console.log('Line 837 propertyReservationData', propertyReservationData)

        const existingProperty = await orm.property.findFirst({
            where: {
                uuid: propertyReservationData?.propertyUuid,
            }
        });

        console.log('Line 845 existingProperty', existingProperty)

        

        // Update property based on UUID
        const updatedProperty = await orm.property.update({

            where: {
                uuid: propertyReservationData.propertyUuid,
            },

            data: {

                reservations: {
                    
                    create: {
                        
                        startDate: propertyReservationData.startDate,
                        
                        endDate: propertyReservationData.endDate,
                        
                        totalPrice: propertyReservationData.totalPrice,
                        
                        user: { connect: { id: propertyReservationData.userId } },
                        
                        listing: { connect: { id: existingProperty?.listingId as number } },
                    }

                }
            },

            include: {
                reservations: true
            }

        });

        return updatedProperty // Return the created reservation
    } catch (error) {
        // Handle any errors
        console.error("Error creating property reservation:", error);
        throw new Error("Failed to create property reservation");
    }
}

export const updatetePropertyPrimaryPhoto = async (propertyPhotoData: any): Promise<Property[] | any> => {


    const primaryPhoto = await orm.property.update({
        where: { id: parseInt(propertyPhotoData?.propertyId) },
        data: {
            imageSrc: propertyPhotoData.primaryPhoto, // Save the concatenated string           
        }
    })



    return primaryPhoto



}

export const deleteAutoSavePropertyPhoto = async (propertyData: any): Promise<PropertyPhoto[] | any> => {

    if(!propertyData){
        throw new Error("Poperty Data Mising");
        
    }

    const propertyPhotoData = propertyData.propertyPhotoData
    const userId = propertyData.userId
    const autoSaveToken = propertyData.autoSaveToken

    const property = await orm.propertyphoto.findFirst({
        where: { 
            imageSrc: propertyPhotoData,
            token: autoSaveToken,
            userId: parseInt(userId),
        },
        
    })

    
    if(property){
            
        const fullLocalPath = path.join(process.cwd(), property.imgFilePath)

        await unlink(property.imgFilePath)

        const deletePropertyPhoto = await orm.propertyphoto.delete({
            where: {
              id: property.id,
            },
          })
    }

    
    


    return propertyData

}

export const deleteProperty = async (propertyData: any): Promise<PropertyPhoto[] | any> => {

    if(!propertyData){
        throw new Error("Poperty Data Mising");
        
    }

            const propertyId = propertyData.propertyId;
            const userId = propertyData.userId;
            const uuid = propertyData.uuid;



            try {
                
           
                const checkIfMainBusinessPhoto = await orm.property.findFirst({
                    where: {
                        id: propertyId,
                        userId: parseInt(userId),
                    },
                    include: {
                        Propertyphotos: true, // Include related Businessphotos
                    },
                });
        
                if (checkIfMainBusinessPhoto) {
                    // Delete the business
                    await orm.property.delete({
                        where: {
                            id: checkIfMainBusinessPhoto.id,
                        },
                    });
        
                    // Delete associated Businessphotos
                    await orm.businessphoto.deleteMany({
                        where: {
                            businessId: checkIfMainBusinessPhoto.id,
                        },
                    });
        
                    // Delete physical files associated with Businessphotos
                    for (const photo of checkIfMainBusinessPhoto.Propertyphotos) {
                        try {
                            await unlink(photo.imgFilePath); // Unlink physical file
                        } catch (error) {
                            console.error(`Error deleting file ${photo.imgFilePath}:`, error);
                        }
                    }
                }

            } catch (error) {
                    
            }
    


    return propertyData

            


}



