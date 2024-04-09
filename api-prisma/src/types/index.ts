import { Decimal } from "@prisma/client/runtime/library";

export const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp'
};

export interface MimeTypeMap {
    [key: string]: string;
}

export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}


export type Business = {
    id: number;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    imageSrc: string | null;
    imagesMultiSrc: string | null;
    category: string;
    isAFranchise: boolean;
    isTheFranchiseParent: boolean;
    ownsOtherBusinesses: boolean;
    locationValue: string | null;
    hasStore: number;
    hasProducts: number;
    hasServices: number;
    userId: number; // Ensure userId is always defined
    countryId: number;
    country: any;
    countryCityId: number | undefined;
    countryCity: any;
    countryStateRegionId: number | undefined;
    countryStateRegion: any;
    listingId: number | undefined | null;
    streetAddress: string | null;
    streetAddress2: string | null;
    streetCity: string | null;
    streetZipCode: string | null;
    sellPrice?: string | null;
    createdAt: Date;
    updatedAt: Date;
}


export type BusinessPhoto = {
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

export type Country = {
    id: number;
    uuid: string | null;
    value: string;
    label: string;
    currency: string;
    phonecode: string;
    flag: string;
    latlng: string;
    latitude: string;
    longitude: string;
    region: string;
    isoCode: string;
    name: string;
    countryStateRegions: string[];
    countryCities: string[];
    timezones: string[];
    listings: string[];
    propertys: string[];
    businesses: string[];
}

export type CountryCity = {
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

export type CountryStateRegion = {
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

export type Favorite = {
    id: number;
    uuid: string;
    userId: number;
    listingId: number | undefined | null;
    propertyId: number | undefined | null;
    businessId: number | undefined | null;
    createdAt: Date;
    updatedAt: Date;

}

export type FavoriteBusinesses = {
    id: number,
    uuid: string,
    userId: number,
    favoriteId: number,
    listingId: number,
    propertyId: number,
    createdAt: Date,
    updatedAt: Date,
    businessId: number,
    listing: {
      id: number,
      uuid: string,
      token: string,
      title: string,
      description: string,
      imageSrc: string,
      category: string,
      createdAt: Date,
      updatedAt: Date,
      userId: number,
      countryId: number,
      countryStateRegionId: number,
      countryCityId: number,
      propertyId: number,
      businessId: number,
      },
      business?: string
}

export type FavoritePropertys = {
    id: number,
    uuid: string,
    userId: number,
    favoriteId: number,
    listingId: number,
    propertyId: number,
    createdAt: Date,
    updatedAt: Date,
    businessId: number,
    listing: {
      id: number,
      uuid: string,
      token: string,
      title: string,
      description: string,
      imageSrc: string,
      category: string,
      createdAt: Date,
      updatedAt: Date,
      userId: number,
      countryId: number,
      countryStateRegionId: number,
      countryCityId: number,
      propertyId: number,
      businessId: number,
      },
    property: {
      id: number,
      uuid: string,
      token: string,
      title: string,
      description: string,
      imageSrc: string,
      imagesMultiSrc: string,
      category: string,
      roomCount: string,
      bathroomCount: string,
      guestCount: string,
      locationValue: string,
      price: string,
      streetAddress: string,
      streetAddress2: string,
      streetCity: string,
      streetZipCode: string,
      createdAt: Date,
      updatedAt: Date,
      userId: number,
      favoriteId: number,
      listingId: number,
      countryId: number,
      countryStateRegionId: number,
      countryCityId: number,

    }
}


export type Listing = {
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

    property?: Property | null;
    country?: Country | null;
    countryStateRegion?: CountryStateRegion | null;
    countryCity?: CountryCity | null;
    userId: number;
}

// type Listing = {
//     propertyId: any;
//     id: number;
//     uuid: string | null;
//     token: string;
//     title: string;
//     description: string;
//     imageSrc: string;
//     category: string;
//     userId: number;
//     countryId: number;
//     countryStateRegionId: number
//     createdAt: Date;
//     updatedAt: Date;
// }

export type ListingPropertyPhoto = {
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


export  type Property = {
    [x: string]: any;
    id: number;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string | null;
    imageSrc: string | null;
    imagesMultiSrc: string | null;
    price: string;
    userId: number;
    streetAddress: string | null;
    streetAddress2: string | null;
    streetCity: string | null;
    streetZipCode: string | null;
    countryId: number | undefined;
    property?: Property | null,
    countryStateRegionId: number | undefined;
    countryCityId: number |undefined;
    createdAt: Date;
}


export interface PropertyReservation {
    id: number;
    uuid: string;
    startDate: Date;
    endDate: Date;
    totalPrice: GLfloat | null;
    createdAt: Date;
    updatedAt: Date,
    userId: number,
    listingId: number,
    listing?: string | string[] | undefined,
    propertyId: number,
    property?: Property | null,
}




export type PropertyPhoto = {
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

export type countrytimezone = {
    id: number;
    countryId: number;
    timezone:  string[]
  
  }
  
  