
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

export type Property = {
    id: number;
    uuid: string | null;
    token: string;
    title: string;
    description: string;
    imageSrc: string | null;
    imagesMultiSrc: string | null;

    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string;
    price: string;
    
    streetAddress: string | null;
    streetAddress2: string | null;
    streetCity: string | null;
    streetZipCode: string | null;
    countryId: number | undefined;
    countryStateRegionId: number | undefined;
    countryCityId: number |undefined;
    
    userId: number;
    createdAt: Date;
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

export type countrytimezone = {
    id: number;
    countryId: number;
    timezone:  string[]
  
  }
  
  