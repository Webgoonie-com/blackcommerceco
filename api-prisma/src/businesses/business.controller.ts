import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { MIME_TYPE_MAP } from "../types";
import path from 'path';


type Business = {
    id: number;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    imageSrc: string;
    category: string;
    hasStore: number;
    hasProducts: number;
    hasServices: number;
    userId: number;
    countryId: number;
    countryCityId: number | undefined;
    countryStateRegionId: number | undefined;
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

export const createBusinessPhotos = async (businessPhotoData: any): Promise<BusinessPhoto[] | any> => {
    
    console.log('Hit Create Business Photos', businessPhotoData);

    const files = businessPhotoData.files; // Access the uploaded files
    const body = businessPhotoData.body; // Access the body data

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
                token: body?.token,
                property: { connect: { id: parseInt(body?.propertyId) } },
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
            category: true,
            
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