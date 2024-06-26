import { orm } from "../utils/orm.server";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { Business, BusinessPhoto, Listing, MIME_TYPE_MAP } from "../types";
import path from 'path';
import { unlink } from "fs/promises";
import { connect } from "http2";





export const listBusinesses = async (): Promise<Business[]> => {


    try {
        
    
    return await orm.business.findMany({
        
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


    } catch (error) {

        console.log('Error', error);
        
        throw error; 
        
    }
}

export const getBusinessId = async (id: number): Promise<Business | null> => {
    
    
    return orm.business.findUnique({
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
            imagesMultiSrc: true,
            category: true,
            listingId: true,
            locationValue: true,
            country: true,
            countryStateRegion: true,
            countryCity: true,
            isAFranchise: true,
            isTheFranchiseParent: true,
            ownsOtherBusinesses: true,
            hasStore: true,
            hasProducts: true,
            hasServices: true,
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            userId: true,
            countryId: true,
            countryStateRegionId: true,
            countryCityId: true,
            createdAt: true,
            updatedAt: true,
        },
    })
}

export const getBusinessUuId = async (uuid: string): Promise<Business | null> => {
    
    
    

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
                imageSrc: true,
                imagesMultiSrc: true,
                category: true,
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
                user: true,
                countryId: true,
                countryStateRegionId: true,
                countryCityId: true,
                country: true,
                countryStateRegion: true,
                countryCity: true,
                createdAt: true,
                updatedAt: true,

        },
    })
}



export const autoSaveBusinessData = async (business: Business, listing: Listing): Promise<Business | any> => {


        const imageSrcString = Array.isArray(business.imageSrc) ? business.imageSrc.join(',') : '';

        const newLocationValue = Array.isArray(business.locationValue) ? business.locationValue.join(',') : '';

        const autoSaveToken = business?.token

        const { token } = business;

        // Begin Country CountryState CountryCity Ripped
        let existingCountry
        let existingCountryStateRegion
        let existingCountryCity

        if(business.country){

            existingCountry = await orm.country.findFirst({
                where: {
                    isoCode: business.country?.isoCode,
                    value: business.country?.value,
                }
            });



            if(!existingCountry){

                const neWCreateCountryLatlng = `${business.country?.latitude},${business.country?.longitude}`;

                try {
                    
                    
                    existingCountry = await orm.country.create({
                        data: {
                            isoCode: business.country?.isoCode,
                            value: business.country?.value,
                            label: business.country?.label,
                            currency: business.country?.currency,
                            phonecode: business.country?.phonecode,
                            flag: business.country?.flag,
                            latlng: neWCreateCountryLatlng,
                            latitude: business.country?.latitude.toString(),
                            longitude: business.country?.longitude.toString(),
                            region: business.country?.region,
                            name: business.country?.name,
                        },
                    });

                } catch (error) {
                    console.log("error", error)
                }

            }

            


        }

        if (business.countryStateRegion) {
            
        
            existingCountryStateRegion = await orm.countryStateRegion.findFirst({
                where: {
                    isoCode: business.countryStateRegion?.isoCode,
                    value: business.countryStateRegion?.value,
                }
            });
        
            
        
            const neWCreateCountryStateRegionLatlng = `${business.countryStateRegion?.latitude},${business.countryStateRegion?.longitude}`;
        
            if (!existingCountryStateRegion) {
                try {
                    existingCountryStateRegion = await orm.countryStateRegion.create({
                        data: {
                            isoCode: business.countryStateRegion?.isoCode,
                            value: business.countryStateRegion?.value,
                            label: business.countryStateRegion?.label,
                            name: business.countryStateRegion?.name,
                            latlng: neWCreateCountryStateRegionLatlng,
                            latitude: business.countryStateRegion?.latitude.toString(),
                            longitude: business.countryStateRegion?.longitude.toString(),
                            country: {
                                connect: { id: existingCountry?.id } // Connect to the associated country
                            },
                        },
                    });
        
                    
                } catch (error) {
                    console.log("error", error);
                }
            }
        }

        if(business.countryCity) {

            

            existingCountryCity = await orm.countryCity.findFirst({
                where: {
                    countryCode: business.countryCity?.countryCode,
                    value: business.countryCity?.value,
                }
            });


            

            if(!existingCountryCity){

                const neWCountryCodeLatlng = `${business.countryCity?.latitude},${business.countryCity?.longitude}`;

                try {
                    existingCountryStateRegion = await orm.countryCity.create({
                        data: {
                            value: business.countryCity?.value,
                            label: business.countryCity?.label,
                            name: business.countryCity?.name,
                            countryCode: business.countryCity?.countryCode,
                            latlng: neWCountryCodeLatlng,
                            latitude: business.countryCity?.latitude.toString(),
                            longitude: business.countryCity?.longitude.toString(),
                            country: {
                                connect: { id: existingCountry?.id } // Connect to the associated country
                            },
                            countryStateRegion: {
                                connect: { id: existingCountryStateRegion?.id } // Connect to the associated country city
                            }
                        },
                    });
        
                    
                } catch (error) {
                    console.log("error", error);
                }

            }




        }

        // End Country CountryState CountryCity Ripped


        // Handle the possibility of countryId, countryStateRegionId, and countryCityId being undefined
        // const countryId = business.countryId !== undefined ? business.countryId : 0; // Replace 0 with a default value if needed
        // const countryStateRegionId = business.countryStateRegionId !== undefined ? business.countryStateRegionId : 0;
        // const countryCityId = business.countryCityId !== undefined ? business.countryCityId : 0;


        let autoSaveBusinessData
        let createdListing
        let createdBusiness
        let existingBusiness
        let existingListing
        let updatedBusiness


        try {
        
            existingBusiness = await orm.business.findFirst({
                where: {
                    token: autoSaveToken,
                    userId: parseInt(business.userId as any)
                }
            });

        } catch (error) {
            console.log('Line 459 on existingBusiness Error', error)
        }
        

        existingListing = await orm.listing.findFirst({
            where: {
                token: autoSaveToken,
                userId: parseInt(business.userId as any)
            }
        });

        // console.log('Line 754 existingListing', existingListing)
        // console.log('Line 755 existingProperty', existingBusiness)

        

        

        if (existingBusiness) {

            // console.log('Line 479 updating Business')

            try {

               
                autoSaveBusinessData = await orm.business.update({
                    where: { id: existingBusiness.id },
                    data: {
                        title: business.title,
                        description: business.description,
                        category: business.category,
                        
                        
                        
                        listingId: existingListing?.id,
                        
                        //imageSrc: imageSrcString,
                        streetAddress: business.streetAddress,
                        streetAddress2: business.streetAddress2,
                        streetCity: business.streetCity,
                        streetZipCode: business.streetZipCode,
                        userId: parseInt(business.userId as any),
                        countryId: existingCountry?.id,
                        countryStateRegionId: existingCountryStateRegion?.id,
                        countryCityId: existingCountryCity?.id,
                    }
                });

                createdListing = await orm.listing.update({
                    where: { id: existingListing?.id },
                    data: {
                        title: listing.title,
                        token: listing.token || token,
                        description: listing.description,
                        category: listing.category,
                        userId: listing.userId,
                        businessId: autoSaveBusinessData?.id,
                        countryId: existingCountry?.id ,
                        countryStateRegionId: existingCountryStateRegion?.id,
                        countryCityId: existingCountryCity?.id,
                    },
                });

                
                updatedBusiness = autoSaveBusinessData
                
            
                
            } catch (error) {
                console.log('Error', error);
            }






        } else {
           
            // If business doesn't exist, create it
            
            if(!existingBusiness){}

            //Create Property And Listing Back to Back

            try {

                autoSaveBusinessData = await orm.business.create({
                    data: {
                        title: business.title,
                        token: business.token,
                        description: business.description,
                        category: business.category,
                        isAFranchise: business.isAFranchise,
                        isTheFranchiseParent: business.isTheFranchiseParent,
                        ownsOtherBusinesses: business.ownsOtherBusinesses,
                        hasStore: business.hasStore,
                        hasProducts: business.hasProducts,
                        hasServices: business.hasServices,
                        streetAddress: business.streetAddress,
                        streetAddress2: business.streetAddress2,
                        streetCity: business.streetCity,
                        streetZipCode: business.streetZipCode,
                        userId: business?.userId || 0,
                        countryId: existingCountry?.id || 0,
                        countryStateRegionId: existingCountryStateRegion?.id || 0,
                        countryCityId: existingCountryCity?.id || 0,
                        
                    },
                });


                createdListing = await orm.listing.create({
                    data: {
                        title: listing.title,
                        token: listing.token || token,
                        description: listing.description,
                        category: listing.category,
                        //imageSrc: imageSrcString, // Save the concatenated string
                        userId: listing.userId,
                        businessId: autoSaveBusinessData?.id,
                        countryId: existingCountry?.id || 0, // Include countryId
                        countryStateRegionId: existingCountryStateRegion?.id, // Include countryStateRegionId
                        countryCityId: existingCountryCity?.id || 0, // Include countryCityId
                    },
                });
                

                createdBusiness = autoSaveBusinessData;
} catch (error) {
    console.log('Error', error);
}

            
                

}

                existingListing = await orm.listing.findFirst({
                    where: {
                        token: autoSaveToken || token,
                        userId: parseInt(business.userId as any)
                    }
                });

                
                if(!existingBusiness){

                    return new Error("Uncessfull Property Exist");
                    

                }
           
            

            // End Business Controller
        

                                    // if(!existingBusiness){
                                    //     return new Error("Uncessfull Business Exist");
                                        

                                    // }

                                    // existingListing = await orm.listing.findFirst({
                                    //     where: {
                                    //         token: autoSaveToken || token,
                                    //         userId: parseInt(business.userId as any)
                                    //     }
                                    // });

                                
                                    


                                    // if(!existingListing){

                                    
                                    // }else{

                                        

                                    // }



        // Run Control Over Countries countryStateRegion countryCity
        // Later Run Location Of actual geo reverse address with street name and zip code targete ghana africa.


        //  return createdListing

        
        return autoSaveBusinessData;




        ///Let's do some more updating and checking.-mb-10


}

export const createBusiness = async (business: Business, listing: Listing): Promise<Business | any> => {


       

        const imageSrcString = Array.isArray(business.imageSrc) ? business.imageSrc.join(',') : '';

        const autoSaveToken = business?.token
        

        const { token } = business;

        

        // Handle the possibility of countryId, countryStateRegionId, and countryCityId being undefined
        const countryId = business.countryId !== undefined ? business.countryId : 0; // Replace 0 with a default value if needed
        const countryStateRegionId = business.countryStateRegionId !== undefined ? business.countryStateRegionId : 0;
        const countryCityId = business.countryCityId !== undefined ? business.countryCityId : 0;


        let autoSaveBusinessData
        let createdListing
        let existingBusiness
        let existingListing
        let updatedBusiness

        existingBusiness = await orm.business.findFirst({
            where: {
                token: autoSaveToken || token,
                userId: parseInt(business.userId as any)
            }
        });

        existingListing = await orm.listing.findFirst({
            where: {
                token: autoSaveToken || token,
                userId: parseInt(business.userId as any)
            }
        });

    

        

        if (existingBusiness) {

   

            try {

                // If business exists, update it
               

                autoSaveBusinessData = await orm.business.update({
                    where: { id: existingBusiness.id },
                    data: {
                        title: business.title,
                        token: business.token || token,
                        description: business.description,
                        category: business.category,
                        
                        
                        
                        
                        
                        streetAddress: business.streetAddress,
                        streetAddress2: business.streetAddress2,
                        streetCity: business.streetCity,
                        streetZipCode: business.streetZipCode,
                        userId: parseInt(business.userId as any),
                    }
                });


                createdListing = await orm.listing.update({
                    where: { id: existingListing?.id},
                    data: {
                        title: listing.title,
                        token: listing.token || token,
                        description: listing.description,
                        category: listing.category,
                        userId: listing.userId,
                        businessId: existingBusiness?.id,
                    }
                });

                
 
                
            } catch (error) {
                console.log('Error', error);
            }

        } 


        



        // Run Control Over Countries countryStateRegion countryCity
        // Later Run Location Of actual geo reverse address with street name and zip code targete ghana africa.


        //  return createdListing

        
        return autoSaveBusinessData;




        ///Let's do some more updating and checking.-mb-10


}

export const createBusinessPhotos = async (businessPhotoData: any): Promise<BusinessPhoto[] | any> => {
    
    //console.log('Hit Create Business Photos', businessPhotoData);

    const files = businessPhotoData.files; // Access the uploaded files
    const body = businessPhotoData.body; // Access the body data

    // console.log('files:', files);
    // console.log('body:', body);

    // console.log('bodyListing Id: ', body?.listingId)





        const createInputs: Prisma.BusinessphotoCreateInput[] = files.map((file: any) => {
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
                imagesMultiSrc: body?.imageSrc,
                imgUrl: imgUrl,
                imgName: body?.imgName,
                imgCatg: body?.imgCatg,
                token: body?.token,
                listing: { connect: { id: parseInt(body?.listingId) } },
                business: { connect: { id: parseInt(body?.businessId) } },
                user: { connect: { id: parseInt(body?.userId) } },
            };
        });

        // console.log('createInput JSON data: ', createInputs);

     // Determine the last image URL
     const lastImageIndex = files.length - 1;
     const lastImageUrl = createInputs[lastImageIndex]?.imgUrl;

    //  console.log('lastImageIndex', lastImageUrl)

     // Update imageSrc for the last image
     createInputs[lastImageIndex].imageSrc = lastImageUrl;


        



    try {
        const createdBusinessPhotos = await Promise.all(createInputs.map(createInput =>
            orm.businessphoto.create({
                data: {
                    ...(createInput as Prisma.BusinessphotoCreateInput),
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

        try {
            
            await orm.business.update({
                where: { id: parseInt(body?.businessId) },
                data: {
                    imageSrc: lastImageUrl, // Save the concatenated string           
                }
            });

        } catch (error) {
            console.log('Error on Updating Last Image Photo', error)
        }

    body?.businessId

    return createdBusinessPhotos;
} catch (error) {
    console.error('Error creating property photos:', error);
    return { error: 'Failed to create property photos. Please check the provided data.' };
}

};

export const updateteBusinessPrimaryPhoto = async (businessPhotoData: any): Promise<Business[] | any> => {

    // console.log('return businessPhotoData', businessPhotoData)

    const primaryPhoto = await orm.business.update({
        where: { id: parseInt(businessPhotoData?.businessId) },
        data: {
            imageSrc: businessPhotoData.primaryPhoto, // Save the concatenated string           
        }
    })

    // console.log('return primaryPhoto', primaryPhoto)

    return primaryPhoto



}

export const getBusinessbyUserId = async (userId: number): Promise<Business[] | null> => {
    
    

    //    console.log('getBusinessbyUserId= userId: ', userId)
    

    try {
        
    
        return await orm.business.findMany({
            where:{
                userId: userId,
            },
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
    
    
        } catch (error) {
    
            console.log('Error', error);
            
            throw error; 
            
        }
    
}

export const deleteAutoSavePhoto  = async (businessData: any): Promise<BusinessPhoto[] | any> => {
    
    


    const propertyPhotoData = businessData.propertyPhotoData
    const userId = businessData.userId
    const autoSaveToken = businessData.autoSaveToken


    try {
        

        
        const checkIfMainBusinessPhoto = await orm.business.findFirst({
            where: {
                imageSrc: propertyPhotoData,
                userId: parseInt(userId as any)
            }
        });

        

        if(checkIfMainBusinessPhoto){
            
            try {
                
                const primaryPhoto = await orm.business.update({
                    where: { id: checkIfMainBusinessPhoto?.id },
                    data: {
                        imageSrc: '', 
                    }
                })
                
            } catch (error) {
                console.log('Business primaryPhoto error', error)
            }
        }
        

       // return checkIfMainBusinessPhoto


        const deleteThisPhotoObject = await orm.businessphoto.findFirst({
            where: {
                imageSrc: propertyPhotoData,
                token: autoSaveToken,
                userId: parseInt(userId),
            }
        });

        
       
        if(deleteThisPhotoObject){
            

        
            
            const fullLocalPath = path.join(process.cwd(), deleteThisPhotoObject.imgFilePath)
    
            
    
            await unlink(deleteThisPhotoObject.imgFilePath)

            


            const deleteBusinessPhoto = await orm.businessphoto.delete({
                where: {
                  id: deleteThisPhotoObject.id,
                },
              })


              return deleteBusinessPhoto

              
        }



        
    } catch (error) {
        console.log('Error deleting', error)
    }

    return businessData;
}

export const deleteBusiness = async (businessData: any): Promise<void> => {
    const userId = businessData.userId;
    const businessId = businessData.businessId;

    try {
        // Find the business to be deleted
        const checkIfMainBusinessPhoto = await orm.business.findFirst({
            where: {
                userId: parseInt(userId),
                id: parseInt(businessId),
            },
            include: {
                Businessphotos: true, // Include related Businessphotos
            },
        });

        if (checkIfMainBusinessPhoto) {
            // Delete the business
            await orm.business.delete({
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
            for (const photo of checkIfMainBusinessPhoto.Businessphotos) {
                try {
                    await unlink(photo.imgFilePath); // Unlink physical file
                } catch (error) {
                    console.error(`Error deleting file ${photo.imgFilePath}:`, error);
                }
            }
        }
    } catch (error) {
        console.error('Error deleting business:', error);
    }
};


export const deleteAutoSaveBusinessPhoto  = async (businessPhotoData: any):  Promise<void> => {
    
    


    const propertyPhotoData = businessPhotoData.propertyPhotoData
    const userId = businessPhotoData.userId
    const autoSaveToken = businessPhotoData.autoSaveToken


    try {
        

        
        const checkIfMainBusinessPhoto = await orm.business.findFirst({
            where: {
                imageSrc: propertyPhotoData,
                userId: parseInt(userId as any)
            }
        });

        

        if(checkIfMainBusinessPhoto){
            
            try {
                
                const primaryPhoto = await orm.business.update({
                    where: { id: checkIfMainBusinessPhoto?.id },
                    data: {
                        imageSrc: '', 
                    }
                })
                
            } catch (error) {
                console.log('Business primaryPhoto error', error)
            }
        }
        

       // return checkIfMainBusinessPhoto


        const deleteThisPhotoObject = await orm.businessphoto.findFirst({
            where: {
                imageSrc: propertyPhotoData,
                token: autoSaveToken,
                userId: parseInt(userId),
            }
        });

        
       
        if(deleteThisPhotoObject){
            

        
            
            const fullLocalPath = path.join(process.cwd(), deleteThisPhotoObject.imgFilePath)
    
            
    
            await unlink(deleteThisPhotoObject.imgFilePath)

            


            await orm.businessphoto.delete({
                where: {
                  id: deleteThisPhotoObject.id,
                },
              })


              //return deleteBusinessPhoto

              
        }



        
    } catch (error) {
        console.log('Error deleting', error)
    }

    return businessPhotoData;
}
