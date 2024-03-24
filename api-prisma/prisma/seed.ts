import { orm } from "../src/utils/orm.server";

type Business = {
    id: number;
    uuid: string;
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
    
    
    countryCity: any;
    countryStateRegion: any;
    country: any;
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


type User = {
    id:                                 number;
    uuid:                               string;
    name:                               string;
    role:                               string;
    email:                              string;
    emailVerified:                      Date | null;
    image:                              string;
    phone:                              string;
    hashedPassword:                     string; 
    firstName:                          string; 
    lastName:                           string;
}

type Property = {
    id:                                 number;
    uuid:                               string | null;
    token:                              string;
    title:                              string;
    description:                        string;
    imageSrc:                           string | null;
    imagesMultiSrc:                     string | null;

    category:                           string;
    roomCount:                          number;
    bathroomCount:                      number;
    guestCount:                         number;
    locationValue:                      string;
    price:                              string;
    
    streetAddress:                      string | null;
    streetAddress2:                     string | null;
    streetCity:                         string | null;
    streetZipCode:                      string | null;
    countryId:                          number | undefined;
    countryStateRegionId:               number | undefined;
    countryCityId:                      number |undefined;
    
    userId:                             number;
    createdAt:                          Date;
}

type Listing = {
    id: number;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    imageSrc: string | null;
    category: string;
    countryId: number | null;
    countryStateRegionId: number | null;
    createdAt: Date;
    updatedAt: Date;

    userId: number;
}


type ListingPropertyPhoto = {
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



async function seed() {

    await Promise.all(
        getUsers().map((user) => {
            return orm.user.create({
                data: {
                    id: user.id,
                    uuid: user.uuid,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    image: user.image,
                    phone: user.phone,
                    role: user.role,
                    emailVerified: user.emailVerified,
                    hashedPassword: user.hashedPassword
                }
            })
        })

        )
        const user = await orm.user.findFirst({
            where: {
                firstName:"John",
            }
        })


        // await Promise.all(
        //     getBusinesses().map((business) => {
        //        return orm.business.create({
        //            data: {
        //             id: business.id,
        //             uuid: business.uuid,
        //             token: business.token,
        //             title: business.title,
        //             description: business.description,
        //             imageSrc: business.imageSrc,
        //             category: business.category,
        //             hasStore: business.hasStore,
        //             hasProducts: business.hasProducts,
        //             hasServices: business.hasServices,
        //             userId: business.userId,
        //             countryCity: business.countryCity,
        //             countryStateRegion: business.countryStateRegion,
        //             country: business.country,
        //             countryId: business.countryId,
        //             countryCityId: business.countryCityId,
        //             countryStateRegionId: business.countryStateRegionId,
        //             listingId: business.listingId,
        //             streetAddress: business.streetAddress,
        //             streetAddress2: business.streetAddress2,
        //             streetCity: business.streetCity,
        //             streetZipCode: business.streetZipCode,
        //             sellPrice: business.sellPrice,
        //             createdAt: business.createdAt,
        //             updatedAt: business.updatedAt,
        //             isAFranchise: business.isAFranchise,
        //             isTheFranchiseParent: business.isTheFranchiseParent,
        //             ownsOtherBusinesses: business.ownsOtherBusinesses,
        //            }
        //        })
        //     })
        // )








}

//  1   =   Now Seed The Types with a return of an arrayObject with keys and values
//  1a  =    return [{}]
//  1b  =   column: "string",  || column: number,
//  2   =   create a function with name(): Array<Type> {1a}
//  3   =   Key Value Pair

//  4   =   roles [shopper, owner, both]

function getUsers(): Array<User> {
    return [
        {
            id: 1,
            uuid: "ab66f11d-25ca-48ee-9f3d-7dc20f1a48d8",
            name: "John Doe",
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@emmail.com",
            image: "",
            phone: "+1(404) 555-1234",
            role: "both",
            emailVerified: new Date(),
            hashedPassword: "$2b$12$AneafNv7kkiVLsyLITXnUe.JWip9/74TyUaaotcJhZ2vZVAS96mSS",
        },
        {
            id: 2,
            uuid: "ed6d84fc-df84-4db9-a104-2b60bb296ea1",
            name: "ane Doe",
            firstName: "Jan",
            lastName: "Doe",
            email: "janedoe@email.com",
            image: "",
            phone: "+1 (404) 555-1235",
            role: "both",
            emailVerified: new Date(),
            hashedPassword: "$2b$12$kI.rtHYnatU2cqsZMK8BZuNjQ3bPpfqUxi7O0d.I/JWZYz7uSpldu",
        },
    ];
}

function getBusinesses(): Array<Business> {
    return [
        {
            countryCity: 1,
            countryStateRegion: 1,
            country: 1,
            id: 0,
            uuid: "22a5da83-94de-4f7f-9370-5f2ae2c0e5b3",
            token: "c8FHiCkUtlTC5Kx5GU1a",
            title: "Wakanda Tours",
            description: "",
            imageSrc: "http://localhost:3334/uploaded/businessphotos/2024/03/23/businessPhoto-1711169127833.webp",
            imagesMultiSrc: null,
            category: "Tours",
            hasStore: 1,
            hasProducts: 1,
            hasServices: 1,
            userId: 1,
            countryId: 3,
            countryCityId: 4,
            countryStateRegionId: 5,
            listingId: 1,
            streetAddress: "4568 Wakanda Blvd",
            streetAddress2: "Bldg 452",
            streetCity: "Accra",
            streetZipCode: "G-46546",
            createdAt: new Date(),
            updatedAt: new Date(),
            isAFranchise: false,
            isTheFranchiseParent: false,
            ownsOtherBusinesses: false
        },
    ]
}


seed();