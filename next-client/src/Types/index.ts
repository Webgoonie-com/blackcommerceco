import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { CurrentUser } from '@/Types/nextauth';
import { Country } from "country-state-city";



;

    export interface currentUser {
        id?: number | null | undefined;
        uuid: string;
        token: string | null | undefined;
        favoriteBapUuids: string | null | undefined;
        favoriteBbUuids: string | null | undefined;
        acctStatus?: number | null | undefined;
        name?: string | null | undefined;
        firstName?: string | null | undefined;
        lastName: string | null | undefined;
        role?: number | null | undefined; // Change the type to number
        emailVerified?: number | null | undefined;
        usrImage?: string | null | undefined;
    }
    
    

    export interface User {
        name: string;
        firstName: string;
        lastName: number;
        id: number;
        uuid: string;
        token: string;
        favoriteBapUuids: string;
        favoriteBbUuids: string;
        acctStatus: number;
        role: number;
        emailVerified: number;
        usrImage: string;
        // ... other properties of Property
    }
    export interface Property {
        id: number;
        uuid: string;
        bathroomCount: number;
        category: string;
        description: string;
        guestCount: number;
        imageSrc: string;
        locationValue: string;
        price: number;
        roomCount: number;
        title: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    
    
        // ... other properties of Property
    }
    export interface Businesses {
        id: number;
        uuid: string;
        token: string;
        acctStatus: number;
        namePublicDisplay: string;
        nameDBA: string;
        nameLegal: string;
        isAFranchise: number;
        isTheFranchiseParent: number;
        ownsOtherBusinesses: number;
        taxNumber: string;
        address: string;
        city: string;
        stateProvince: string;
        country: string;
        userId: number;
        businessId: number;
        BusinessUploads: string;
        sellPrice: string;
        // ... other properties of Property
    }
    
    export interface Reservation {
        id: number;
        locationValue: string;
        totalPrice: number;
        startDate: Date,
        endDate: Date,
        // ... other properties of Property
    }
    
    export type ListingTripCardProps = {
        data: {
            Id: number;
            uuid: string;
            userId: number;
            
            user: User;
            
            countryCityId: number;
            Country: Country;
            countryStateRegion: CountryStateRegion;
            countryStateRegionId: number;
    
            imageSrc: string;
            category: string;
            title: string;
            description: string;
            streetCity: string;
            roomCount: number;
            guestCount: number;
            bathroomCount: number;
    
            price: string;
            favoriteBapUuids: string;
            favoriteBbUuids: string;
            streetAddress: string;
            streetAddress2: string;
            streetZipCode: string;
            locationValue: string;
            Businesses: Businesses;
            updatedAt: Date;
            country: Country;
        } | null;
        reservation?: {
            reservationProperty(
                   
                    reservationProperty: ReservationProperty
            ): unknown;
            Reservation: Reservation;
        } | null;
        onAction?: (Id: string) => void;
        disabled?: boolean
        actionLabel?: string;
        actionId?: string;
        currentUser?: currentUser
    
    }

    export type ListingReservationProps = {
        
        id: number;
        uuid: string;
        listingId: number;
        propertyId: number;
        startDate: Date;
        totalPrice: number;
        updatedAt: Date;
        userId: number;
        createdAt: Date;
        endDate: Date;

    }

    export interface ListingBbCardProps {
         data: {
            Id: number;
            uuid: string;
            userId: number;
            
            user: CurrentUser;
            
            countryCityId: number;
            Country: Country;
            countryStateRegion: CountryStateRegion;
            countryStateRegionId: number;
    
            imageSrc: string;
            category: string;
            title: string;
            description: string;
            streetCity: string;
            roomCount: number;
            guestCount: number;
            bathroomCount: number;
    
            price: string | null;
    
            streetAddress: string;
            streetAddress2: string;
            streetZipCode: string;
            locationValue: string;
            Businesses: Businesses;
            updatedAt: Date;
            country: Country;
        } | null;
        reservation?: {
            Reservation: Reservation;
        } | null;
        onAction?: (Id: string) => void;
        disabled?: boolean
        actionLabel?: string;
        actionId?: string;
        currentUser?: currentUser
    
    }
    
    export interface ListingCardProps {
        data: {
            Id: number;
            uuid: string;
            UserId: number;
            PropertyId: number;
            BusinessId: number;
            ServiceId: number;
            ProductId: number;
            ListingId: number;
            ServiceListingId: number;
            User: User;
            Property: Property;
            Businesses: Businesses;
            updatedAt: Date;
            // ... other properties of data
        } | null;
        reservation?: {
            Reservation: Reservation;
                // ... other properties of data
        } | null;
        onAction?: (Id: string) => void;
        disabled?: boolean
        actionLabel?: string;
        actionId?: string;
        //currentUser?: IUser | null
        currentUser?: CurrentUser | null
    
    }

    export type ReservationProperty = {

        createdAt: string;
        startDate: string;
        endDate: string;
        property: safeProperty;
        listing: SafeListing;
    };
    export interface PropertyReservation {
        id: number;
        uuid: string;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        createdAt: Date;
        updatedAt: Date,
        userId: number,
        listingId: number,
        listing?: string | string[] | undefined,
        propertyId: number,
    }

    export interface PropertyListing {
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
        imageSrc: string | null;
        imagesMultiSrc: string | null;
        price: string;
        userId: number;
        listingId: number;
        streetAddress: string | null;
        streetAddress2: string | null;
        streetCity: string | null;
        streetZipCode: string | null;
        country: any | null;
        countryId: number | null;
        countryStateRegion: any | null;
        countryStateRegionId: number | null;
        countryCity: any | null;
        countryCityId: number | null;
        createdAt: Date;
        updatedAt: Date;
        onAction?: (Id: string) => void;
        disabled?: boolean
        actionLabel?: string;
        actionId?: string;
        //currentUser?: IUser | null
        currentUser?: CurrentUser | null
    }

    export interface ListingBapCardProps {
        data: {
            Id: number;
            uuid: string;
            userId: number;
            
            user: User;
            
            countryCityId: number;
            Country: Country;
            countryStateRegion: CountryStateRegion;
            countryStateRegionId: number;
    
            imageSrc: string;
            category: string;
            title: string;
            description: string;
            streetCity: string;
            roomCount: number;
            guestCount: number;
            bathroomCount: number;
    
            price: string;
            favoriteBapUuids: string;
            favoriteBbUuids: string;
            streetAddress: string;
            streetAddress2: string;
            streetZipCode: string;
            locationValue: string;
            Businesses: Businesses;
            updatedAt: Date;
            country: Country;
        } | null;
        reservation?: {
            reservationProperty(
                    arg0: string, 
                    
                ): unknown;
            Reservation: Reservation;
        } | null;
        onAction?: (Id: string) => void;
        disabled?: boolean
        actionLabel?: string;
        actionId?: string;
        currentUser?: currentUser
    
    }
    
    export interface BuisinessListing {
        id: number;
        uuid: string | null;
        token: string;
        title: string;
        description: string;
        imageSrc: string | null;
        listingId: number;
        category: string;
        country: any | null;
        countryId: number | null;
        countryStateRegion: any | null;
        countryStateRegionId: number | null;
        countryCity: any | null;
        countryCityId: number | null;
        createdAt: Date;
        updatedAt: Date;
        sellPrice: string,
        locationValue: string | null;
        reservation?: {
            Reservation: Reservation;
                // ... other properties of data
        } | null;
        onAction?: (Id: string) => void;
        disabled?: boolean
        actionLabel?: string;
        actionId?: string;
        //currentUser?: IUser | null
        currentUser?: CurrentUser | null
    
    }
    export interface Listing {
        id: number;
        uuid: string | null;
        token: string;
        title: string;
        description: string;
        imageSrc: string | null;
        category: string;
        country: any | null;
        countryId: number | null;
        countryStateRegion: any | null;
        countryStateRegionId: number | null;
        countryCity: any | null;
        countryCityId: number | null;
        createdAt: Date;
        updatedAt: Date;
        price: string,
        locationValue: string | null;
        reservation?: {
            Reservation: Reservation;
                // ... other properties of data
        } | null;
        onAction?: (Id: string) => void;
        disabled?: boolean
        actionLabel?: string;
        actionId?: string;
        //currentUser?: IUser | null
        currentUser?: CurrentUser | null
    
    }

    export type safeProperty = Omit<
        Listing, 
            "createdAt"
        > & {
        createdAt: string;
    };
    
    export type SafeListing = Omit<
        Listing, 
            "createdAt"
        > & {
        createdAt: string;
    };

    export type SafeReservation = Omit<
        Reservation, 
        "createdAt" | "startDate" | "endDate" | "listing"
    > & {
        reservationProperty: string[] | string | [];
        createdAt: string;
        imageSrc: string;
        startDate: string;
        endDate: string;
        id: number | undefined;
        property: safeProperty;
        listing: SafeListing;
    };

    export type SafeUser = Omit<
        currentUser,
        "name" | "createdAt" | "updatedAt" | "emailVerified"
        > & {
        name: string;
        createdAt: string;
        updatedAt: string;
        emailVerified: string | null;
    };

    export type NextApiResponseServerIo = NextApiResponse & {
        socket: Socket & {
            server: NetServer & {
            io: SocketIOServer;
            };
        };
    };

    export type MIME_TYPE_MAP = {
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'image/jpg': 'jpg',
        'image/webp': 'webp'
    };
    

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

    export interface userUpdateBapInput {
        // Include other properties
        favoriteBapUuids: string | undefined;
        
    }

    export interface userUpdateBbInput {
        // Include other properties
        favoriteBbUuids: string | undefined;
        
    }
    
    // If userUpdateInput is a union type, include favoriteBapUuids in all constituent types
    export type userUpdateInputWithFavoriteBapUuids = userUpdateBapInput & {
        favoriteBapUuids: string | null | undefined;
    };

    export type userUpdateInputWithFavoriteBbUuids = userUpdateBbInput & {
        favoriteBbUuids: string | null | undefined;
    };