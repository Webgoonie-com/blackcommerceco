import { orm } from "../utils/orm.server";
import bcrypt from "bcrypt";
import { Prisma } from '@prisma/client'; // Import Prisma types
import { MIME_TYPE_MAP } from "../types";
import path from 'path';



type Property = {
    id: number;
    uuid: string | null;
    token: string;
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
    streetAddress: string | null;
    streetAddress2: string | null;
    streetCity: string | null;
    streetZipCode: string | null;
    countryId: number | undefined;
    countryStateRegionId: number | undefined;
    countryCityId: number |undefined;
    createdAt: Date;
}


type PropertyPhoto = {
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
            price: true,
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
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
        token: p.token,
        description: p.description,
        category: p.category,
        roomCount: p.roomCount,
        bathroomCount: p.bathroomCount,
        guestCount: p.guestCount,
        locationValue: p.locationValue,
        imageSrc: p.imageSrc,
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
    
    
    return orm.property.findUnique({
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
            price: true,
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            userId: true,
            countryId: true,
            countryStateRegionId: true,
            countryCityId: true,
            createdAt: true,
        },
    })
}




export const getPropertyUuId = async (uuid: string): Promise<Property | null> => {
    return orm.property.findUnique({
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
            roomCount: true,
            bathroomCount: true,
            guestCount: true,
            locationValue: true,
            imageSrc: true,
            price: true,
            streetAddress: true,
            streetAddress2: true,
            streetCity: true,
            streetZipCode: true,
            userId: true,
            countryId: true,
            countryCityId: true,
            countryStateRegionId: true,
            createdAt: true,
        },
    })
}



export const createProperty = async (property: Property): Promise<Property | any> => {
    console.log('Hit Create Property Hit on line 96');

    const price = property.price.toString();

        const imageSrcString = Array.isArray(property.imageSrc) ? property.imageSrc.join(',') : '';

        const autoSaveToken = property?.token
        console.log('Line 142 autoSaveToken', autoSaveToken)

        const { token } = property;

        console.log('Line 146 autoSaveToken', token)

        // Handle the possibility of countryId, countryStateRegionId, and countryCityId being undefined
        const countryId = property.countryId !== undefined ? property.countryId : 0; // Replace 0 with a default value if needed
        const countryStateRegionId = property.countryStateRegionId !== undefined ? property.countryStateRegionId : 0;
        const countryCityId = property.countryCityId !== undefined ? property.countryCityId : 0;


        

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
                        token: property.token || token,
                        description: property.description,
                        category: property.category,
                        roomCount: property.roomCount,
                        bathroomCount: property.bathroomCount,
                        locationValue: property.locationValue || 'placeholder_value',
                        guestCount: property.guestCount,
                        imageSrc: imageSrcString, // Save the concatenated string
                        price: price, // Pass the price as a number
                        streetAddress: property.streetAddress,
                        streetAddress2: property.streetAddress2,
                        streetCity: property.streetCity,
                        streetZipCode: property.streetZipCode,
                        userId: property.userId,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
                    }
                });


                return updatedProperty;          
                
            } catch (error) {
                console.log('Error', error);
            }

        } else {
           
            // If property doesn't exist, create it

            try {
                
           
                const createdProperty = await orm.property.create({
                    data: {
                        title: property.title,
                        token: property.token || token,
                        description: property.description,
                        category: property.category,
                        roomCount: property.roomCount,
                        bathroomCount: property.bathroomCount,
                        locationValue: property.locationValue || 'placeholder_value',
                        guestCount: property.guestCount,
                        imageSrc: imageSrcString, // Save the concatenated string
                        price: price, // Pass the price as a number
                        streetAddress: property.streetAddress,
                        streetAddress2: property.streetAddress2,
                        streetCity: property.streetCity,
                        streetZipCode: property.streetZipCode,
                        userId: property.userId,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
                    }
                });

                return createdProperty;

            } catch (error) {
                console.log('Error', error);
            }
        }
};


export const autoSavePropertyData = async (property: Property): Promise<Property | any> => {


    console.log("Hit autoSavePropertyData Service.ts new Controller.ts", property)
    //return property;

        const price = property.price.toString();

        const imageSrcString = Array.isArray(property.imageSrc) ? property.imageSrc.join(',') : '';

        const autoSaveToken = property?.token
        console.log('Line 142 autoSaveToken', autoSaveToken)

        const { token } = property;

        console.log('Line 146 autoSaveToken', token)

        // Handle the possibility of countryId, countryStateRegionId, and countryCityId being undefined
        const countryId = property.countryId !== undefined ? property.countryId : 0; // Replace 0 with a default value if needed
        const countryStateRegionId = property.countryStateRegionId !== undefined ? property.countryStateRegionId : 0;
        const countryCityId = property.countryCityId !== undefined ? property.countryCityId : 0;


        

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
                        token: property.token || token,
                        description: property.description,
                        category: property.category,
                        roomCount: property.roomCount,
                        bathroomCount: property.bathroomCount,
                        locationValue: property.locationValue || 'placeholder_value',
                        guestCount: property.guestCount,
                        imageSrc: imageSrcString, // Save the concatenated string
                        price: price, // Pass the price as a number
                        streetAddress: property.streetAddress,
                        streetAddress2: property.streetAddress2,
                        streetCity: property.streetCity,
                        streetZipCode: property.streetZipCode,
                        userId: property.userId,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
                    }
                });
                return updatedProperty;          
                
            } catch (error) {
                console.log('Error', error);
            }

        } else {
           
            // If property doesn't exist, create it

            try {
                
           
                const createdProperty = await orm.property.create({
                    data: {
                        title: property.title,
                        token: property.token || token,
                        description: property.description,
                        category: property.category,
                        roomCount: property.roomCount,
                        bathroomCount: property.bathroomCount,
                        locationValue: property.locationValue || 'placeholder_value',
                        guestCount: property.guestCount,
                        imageSrc: imageSrcString, // Save the concatenated string
                        price: price, // Pass the price as a number
                        streetAddress: property.streetAddress,
                        streetAddress2: property.streetAddress2,
                        streetCity: property.streetCity,
                        streetZipCode: property.streetZipCode,
                        userId: property.userId,
                        countryId: countryId, // Include countryId
                        countryStateRegionId: countryStateRegionId, // Include countryStateRegionId
                        countryCityId: countryCityId, // Include countryCityId
                    }
                });

            return createdProperty;

            } catch (error) {
                console.log('Error', error);
            }
        }



        ///Let's do some more updating and checking.-mb-10


}


export const createPropertyPhotos = async (propertyData: any): Promise<PropertyPhoto[] | any> => {
    console.log('Hit Create Property Photos', propertyData);

    const files = propertyData.files; // Access the uploaded files
    const body = propertyData.body; // Access the body data

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


