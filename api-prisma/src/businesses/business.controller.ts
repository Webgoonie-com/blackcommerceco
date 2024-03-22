import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { MIME_TYPE_MAP } from "../types";
import path from 'path';


type Business = {
    countryCity: any;
    countryStateRegion: any;
    country: any;
    id: number;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    imageSrc: string | null;
    imagesMultiSrc: string | null;
    category: string;
    hasStore: number;
    hasProducts: number;
    hasServices: number;
    userId: number;
    
    countryId: number;
    countryCityId: number | undefined;
    countryStateRegionId: number | undefined;

    listingId: number | undefined | null;
    streetAddress: string | null;
    streetAddress2: string | null;
    streetCity: string | null;
    streetZipCode: string | null;
    sellPrice?: string;
    
    createdAt: Date;
    updatedAt: Date;

    isAFranchise: boolean;
    isTheFranchiseParent: boolean;
    ownsOtherBusinesses: boolean;
}

type BusinessPhoto = {
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

// We using listing to here to make a type for it
type Listing = {
    id: number;
    businessId: any;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    imageSrc: string;
    category: string;
    userId: number;
    countryId: number;
    countryStateRegionId: number
    createdAt: Date;
    updatedAt: Date;
}


type CountryCity = {
    id: number;
    uuid: string | null;
    value: string;
    label: string;
    countryCode: string;
    latlngts: number;
    latitude: string;
    longitude: string;
    countryId: number;
    name: string;
}


type CountryStateRegion = {
    id: number | null;
    uuid: string | null;
    value: string;
    label: string;
    countryCode: string;
    latlng: string;
    
    latitude: string;
    longitude: string;
    name: string;
    
    countryId: number | null;
    isoCode: string;
}

type Country = {
    id: number | undefined | null;
    uuid: string | null;
    value: string;
    isoCode: string;
    name: string;
    currency: string;
    phonecode: string;
    flag: string;
    latitude: number;
    longitude: number;
    region: string;
    timezones: string[];
}


export const listBusinesses = async (): Promise<Business[]> => {

    console.log('We Hit Controller now')


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
            listingId: true,
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
            
         }
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
            category: true,
            imageSrc: true,
            imagesMultiSrc: true,
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
            listingId: true,
            countryId: true,
            countryStateRegionId: true,
            countryCityId: true,
            createdAt: true,
            updatedAt: true,
        },
    })
}


export const autoSaveBusinessData = async (business: Business, listing: Listing): Promise<Business | any> => {


    console.log("Hit autoSavePropertyData Service.ts new Controller.ts", business)
    //return business;

        

        const imageSrcString = Array.isArray(business.imageSrc) ? business.imageSrc.join(',') : '';

        const autoSaveToken = business?.token
        console.log('Line 142 autoSaveToken', autoSaveToken)

        const { token } = business;

        console.log('Line 146 autoSaveToken', token)

        // Begin Country CountryState CountryCity Ripped
        let existingCountry
        let existingCountryStateRegion
        let existingCountryCity

        console.log('Begin To Rip Out Country ON Insert Update',  business)

        if(business.country){

            
            console.log('Begin To Rip Out Country ON Insert Update',  business.country)

            

            existingCountry = await orm.country.findFirst({
                where: {
                    isoCode: business.country?.isoCode,
                    value: business.country?.value,
                }
            });

            console.log('1 Existing Country: ', existingCountry)

            if(!existingCountry){
                //console.log("It's time to Create A New Country: ", existingCountry)
                console.log("It's time to Create A New Country: ")

                const neWCreateCountryLatlng = `${business.country?.latitude},${business.country?.longitude}`;

                // const user = await prisma.user.create({
                //     data: {
                //       name: 'Alice',
                //       email: 'alice@prisma.io',
                //     },
                //   })

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



                    console.log("newCountry", existingCountry)


                } catch (error) {
                    console.log("error", error)
                }

            }

            //console.log("2 Ater it's all said and done on country", existingCountry)


        }

        if (business.countryStateRegion) {
            //console.log("Let's Begin  countryStateRegion ", business.countryStateRegion);
        
            existingCountryStateRegion = await orm.countryStateRegion.findFirst({
                where: {
                    isoCode: business.countryStateRegion?.isoCode,
                    value: business.countryStateRegion?.value,
                }
            });
        
            //console.log('1 existingCountryStateRegion', existingCountryStateRegion);
        
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

        if(business.countryCity) {

            console.log("countryCity damnit", business.countryCity)

            existingCountryCity = await orm.countryCity.findFirst({
                where: {
                    countryCode: business.countryCity?.countryCode,
                    value: business.countryCity?.value,
                }
            });


            console.log("1 countryCity existingCountryCity", existingCountryCity)

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
        
                    console.log("new existingCountryStateRegion", existingCountryStateRegion);
                } catch (error) {
                    console.log("error", error);
                }

            }




        }

        // End Country CountryState CountryCity Ripped


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

        console.log('Line 322 existingListing', existingListing)

        

        if (existingBusiness && existingListing) {

            console.log('Line 346 updating business')

            try {

                // If business exists, update it
               // updatedbusiness = await orm.business.update({

                autoSaveBusinessData = await orm.business.update({
                    where: { id: existingBusiness.id },
                    data: {
                        title: business.title,
                        token: business.token || token,
                        description: business.description,
                        category: business.category,
                        
                        
                        
                        listingId: existingListing.id,
                        
                        imageSrc: imageSrcString, // Save the concatenated string
                        streetAddress: business.streetAddress,
                        streetAddress2: business.streetAddress2,
                        streetCity: business.streetCity,
                        streetZipCode: business.streetZipCode,
                        userId: business.userId,
                        countryId: existingCountry?.id, // Include countryId
                        countryStateRegionId: existingCountryStateRegion?.id, // Include countryStateRegionId
                        countryCityId: existingCountryCity?.id,
                    }
                });

                
                //return updatedbusiness;          
                
            } catch (error) {
                console.log('Error', error);
            }

        } else {
           
            // If business doesn't exist, create it
            console.log('business Creation attempt')

            try {
                
           
                autoSaveBusinessData = await orm.business.create({
                    data: {
                        title: business.title,
                        token: business.token || token,
                        description: business.description,
                        category: business.category,
                        isAFranchise: business.isAFranchise,
                        isTheFranchiseParent: business.isTheFranchiseParent,
                        ownsOtherBusinesses: business.ownsOtherBusinesses,
                        hasStore: business.hasStore,
                        hasProducts: business.hasProducts,
                        hasServices: business.hasServices,
                        imageSrc: imageSrcString, // Save the concatenated string
                        streetAddress: business.streetAddress,
                        streetAddress2: business.streetAddress2,
                        streetCity: business.streetCity,
                        streetZipCode: business.streetZipCode,
                        userId: business.userId,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
                        //user: { connect: { id: business?.userId  as any } },
                        
                        // user: {
                        //     connect: { id: business.userId } // Assuming you want to connect the business to an existing user
                        // }
                    },
                    select: {
                        id: true,
                        uuid: true,
                        title: true,
                        token: true,
                        description: true,
                        category: true,
                        hasStore: true,
                        hasProducts: true,
                        hasServices: true,
                        imageSrc: true,
                        
                        isAFranchise: true,
                        isTheFranchiseParent: true,
                        ownsOtherBusinesses: true,
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

            //return autoSaveCreateUpdatebusiness;

            } catch (error) {
                console.log('Error', error);
            }
        }

        if(!existingBusiness){
            return new Error("Uncessfull Business Exist");
            

        }

        existingListing = await orm.listing.findFirst({
            where: {
                token: autoSaveToken || token,
                userId: parseInt(business.userId as any)
            }
        });

        console.log('Line 452 existingListing', existingListing)


        if(!existingListing){

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
                        businessId: existingBusiness?.id,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
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

            console.log('Line 497 try Updating existingListing existingListing', existingListing.id)

            try {
                
                createdListing = await orm.listing.update({
                    where: { id: existingListing?.id},
                    data: {
                        title: listing.title,
                        token: listing.token || token,
                        description: listing.description,
                        category: listing.category,
                        imageSrc: imageSrcString, // Save the concatenated string
                        userId: listing.userId,
                        businessId: existingBusiness?.id,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
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

        console.log('autoSaveCreateUpdateBusiness: ', autoSaveBusinessData);
        return autoSaveBusinessData;




        ///Let's do some more updating and checking.-mb-10


}

//  This should be the final wizard step from the auto save good time to take the business live and be sure to comb all the country data input properly.
//  Hopefull you sent this to the api on setTimeOut In the front end.

export const createBusiness = async (business: Business, listing: Listing): Promise<Business | any> => {


    console.log("Hit autoSavePropertyData Service.ts new Controller.ts", business)
    //return business;

        

        const imageSrcString = Array.isArray(business.imageSrc) ? business.imageSrc.join(',') : '';

        const autoSaveToken = business?.token
        console.log('Line 142 autoSaveToken', autoSaveToken)

        const { token } = business;

        console.log('Line 146 autoSaveToken', token)

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

        console.log('Line 322 existingListing', existingListing)

        

        if (existingBusiness) {

            console.log('Line 346 updating business')

            try {

                // If business exists, update it
               // updatedbusiness = await orm.business.update({

                autoSaveBusinessData = await orm.business.update({
                    where: { id: existingBusiness.id },
                    data: {
                        title: business.title,
                        token: business.token || token,
                        description: business.description,
                        category: business.category,
                        
                        
                        
                        
                        imageSrc: imageSrcString, // Save the concatenated string
                        streetAddress: business.streetAddress,
                        streetAddress2: business.streetAddress2,
                        streetCity: business.streetCity,
                        streetZipCode: business.streetZipCode,
                        userId: business.userId,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
                    }
                });

                
                //return updatedbusiness;          
                
            } catch (error) {
                console.log('Error', error);
            }

        } else {
           
            // If business doesn't exist, create it
            console.log('business Creation attempt')

            try {
                
           
                autoSaveBusinessData = await orm.business.create({
                    data: {
                        title: business.title,
                        token: business.token || token,
                        description: business.description,
                        category: business.category,
                        isAFranchise: business.isAFranchise,
                        isTheFranchiseParent: business.isTheFranchiseParent,
                        ownsOtherBusinesses: business.ownsOtherBusinesses,
                        hasStore: business.hasStore,
                        hasProducts: business.hasProducts,
                        hasServices: business.hasServices,
                        imageSrc: imageSrcString, // Save the concatenated string
                        streetAddress: business.streetAddress,
                        streetAddress2: business.streetAddress2,
                        streetCity: business.streetCity,
                        streetZipCode: business.streetZipCode,
                        userId: business.userId,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
                        //user: { connect: { id: business?.userId  as any } },
                        
                        // user: {
                        //     connect: { id: business.userId } // Assuming you want to connect the business to an existing user
                        // }
                    },
                    select: {
                        id: true,
                        uuid: true,
                        title: true,
                        token: true,
                        description: true,
                        category: true,
                        hasStore: true,
                        hasProducts: true,
                        hasServices: true,
                        imageSrc: true,
                        
                        isAFranchise: true,
                        isTheFranchiseParent: true,
                        ownsOtherBusinesses: true,
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

            //return autoSaveCreateUpdatebusiness;

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

        console.log('Line 452 existingListing', existingListing)

        if(!existingBusiness){
            return new Error("Uncessfull Business Exist");
            

        }

        if(!existingListing){

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
                        businessId: existingBusiness?.id,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
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

            console.log('Line 497 try Updating existingListing existingListing', existingListing.id)

            try {
                
                createdListing = await orm.listing.update({
                    where: { id: existingListing?.id},
                    data: {
                        title: listing.title,
                        token: listing.token || token,
                        description: listing.description,
                        category: listing.category,
                        imageSrc: imageSrcString, // Save the concatenated string
                        userId: listing.userId,
                        businessId: existingBusiness?.id,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
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

        console.log('autoSaveCreateUpdateBusiness: ', autoSaveBusinessData);
        return autoSaveBusinessData;




        ///Let's do some more updating and checking.-mb-10


}




export const createBusinessPhotos = async (businessPhotoData: any): Promise<BusinessPhoto[] | any> => {
    
    console.log('Hit Create Business Photos', businessPhotoData);

    const files = businessPhotoData.files; // Access the uploaded files
    const body = businessPhotoData.body; // Access the body data

    console.log('files:', files);
    console.log('body:', body);





        const createInputs: Prisma.BusinessphotoCreateInput[] = files.map((file: any) => {
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

    console.log('createInput JSON data: ', JSON.stringify(createInputs));

     // Determine the last image URL
     const lastImageIndex = files.length - 1;
     const lastImageUrl = createInputs[lastImageIndex].imgUrl;

     // Update imageSrc for the last image
     createInputs[lastImageIndex].imageSrc = lastImageUrl;


        console.log('createInput JSON data: ', JSON.stringify(createInputs));

        await orm.business.update({
            where: { id: body?.businessId },
            data: {
                imageSrc: lastImageUrl, // Save the concatenated string           
            }
        });


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


    body?.businessId

    return createdBusinessPhotos;
} catch (error) {
    console.error('Error creating property photos:', error);
    return { error: 'Failed to create property photos. Please check the provided data.' };
}

};