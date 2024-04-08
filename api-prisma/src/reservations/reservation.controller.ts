import { orm } from "../utils/orm.server";
import { Prisma, ReservationProperty } from '@prisma/client';
import { Listing, MIME_TYPE_MAP, Property, PropertyPhoto, PropertyReservation } from "../types";
import path from 'path';
import { unlink } from "fs/promises";






export const listReservations = async (): Promise<PropertyReservation[]> => {
    
    console.log('Hit getPropertyReservationUuId from  "/reservationsproperty/:uuid": ')
    
    return orm.reservationProperty.findMany({
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
            property: true,
        }
        
    })
}


export const getListingsWithReservations = async (): Promise<Listing[]> => {
    
    console.log('Hit getPropertyReservationUuId from  "/reservationsproperty/:uuid": ')
    
    return orm.listing.findMany({
        select:{
            id: true,
            uuid: true,
            token: true,
            title: true,
            description: true,
            imageSrc: true,
            category: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            countryId: true,
            reservationProperty: true,
            countryStateRegionId: true,
            countryCityId: true,
            propertyId: true,
            businessId: true,
        }
        
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

export const getPropertyReservations = async (body: any, query: any): Promise<PropertyReservation[]> => {
    
    console.log('Hit getPropertyReservationUuId')

    console.log('Hit body: ',  body)

    console.log('Hit query: ',  query)

    
    const { listingUuId, propertyUuId, userId, authorId} = query

    const existingProperty = await orm.country.findFirst({
        where: {
           uuid: propertyUuId,
        }
    });

    if(!existingProperty){
        throw new Error("");
        
    }



    return orm.reservationProperty.findMany({
        
        where: {
            userId: userId,
            propertyId: existingProperty?.id,
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

export const queryReservationsByStrings = async (body: any, query: any): Promise<PropertyReservation[]> => {
    
    console.log('Hit getPropertyReservationUuId')

    console.log('Hit body: ',  body)

    console.log('Hit query: ',  query)

    
    const { listingUuId, propertyUuId, userId, authorId} = query

    const existingProperty = await orm.country.findFirst({
        where: {
           uuid: propertyUuId,
        }
    });

    if(!existingProperty){
        throw new Error("");
        
    }



    return orm.reservationProperty.findMany({
        
        where: {
            userId: userId,
            propertyId: existingProperty?.id,
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
