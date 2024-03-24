import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import Categories from "@/Components/Categories/PropertyCategories";
import { CurrentUser } from '@/Types/nextauth';
import { DefaultSession, DefaultUser} from "next-auth";
import { IUser } from '@/Types/nextauth';
import { Country } from "country-state-city";

;

    export interface currentUser {
        firstName?: string | null | undefined;
        lastName: string | null | undefined;
        Id?: number | null | undefined;
        uuid: string;
        token: string | null | undefined;
        favoriteIds: string | null | undefined;
        acctStatus?: number | null | undefined;
        role?: number | null | undefined; // Change the type to number
        emailVerified?: number | null | undefined;
        usrImage?: string | null | undefined;
    }
    
    

    export interface User {
        firstName: string;
        lastName: number;
        Id: number;
        uuid: string;
        token: string;
        favoriteIds: string;
        acctStatus: number;
        role: number;
        emailVerified: number;
        usrImage: string;
        // ... other properties of Property
    }
    export interface Property {
        Id: number;
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
        // ... other properties of Property
    }
    
    export interface Reservation {
        locationValue: string;
        totalPrice: number;
        startDate: Date,
        endDate: Date,
        // ... other properties of Property
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
    export interface Listing {
        Id: number;
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
        createdAt: string;
        startDate: string;
        endDate: string;
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