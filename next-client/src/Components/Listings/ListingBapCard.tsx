'use client'

import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { CurrentUser, IUser } from '@/Types/nextauth';
import { CountryStateRegion, currentUser, User } from '@/Types';
import useCountries from '@/Hooks/useCountries';
import { useRouter } from 'next/navigation';

import { format } from 'date-fns'
import Image from 'next/image';
import HeartIconButton from '@/Elements/Icons/HeartIconButton';
import Button from '@/Elements/Button';

import useFavorite from '@/Hooks/useFavorite';
import getCurrentUser from "@/Actions/getCurrentUser"

//import logo from '../../../public/images/logo.png'
import logo from '../../../public/images/logo.png'

const logoPlaceHolder = `${process.env.NEXT_PUBLIC_URL}` + logo.src



interface Country {
    id: number;
    uuid: string;
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
}
interface Property {
    Id: number;
    uuid: string;
    bathroomCount: number;
    category: string;
    description: string;
    guestCount: number;
    imageSrc: string | undefined | null;
    locationValue: string;
    price: number;
    roomCount: number;
    title: string;
    userId: number;
    country: Country;
    createdAt: Date;
    updatedAt: Date;

}


interface Businesses {
    uuid: string;
    token: string;
    acctStatus: number;
    namePublicDisplay: string;
    nameDBA: string;
    nameLegal: string;
    imageSrc: string;
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
   
}

interface Reservation {
    locationValue: string;
    totalPrice: number;
    startDate: Date,
    endDate: Date,
}

interface ListingBapCardProps {
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

const ListingBapCard: React.FC<ListingBapCardProps> =  ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
    
}) => {

    
 
    

    const router = useRouter()

    const { getByValue } = useCountries();

    const listingId = data?.uuid || 0;
    

    


    // For trips reserverations
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()

            if(disabled){
                return
            }

            onAction?.(actionId)
        }, [onAction, actionId, disabled]
    )

    const price = useMemo(() => {
        if(reservation){
            return reservation?.Reservation?.totalPrice;
        }

        return  data?.price
    }, [reservation,  data?.price])

    const reservationDate = useMemo(() => {

        if(!reservation){
            return null
        }


        const start = new Date(reservation?.Reservation?.startDate)
        const end = new Date(reservation?.Reservation?.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])

    console.log('Line 191 data Bap Listing', data)

    return (
        
        <div
            onClick={() => router.push(`/bap/${data?.uuid}`)} 
            className='col-span-1 cursor-pointer group text-white'
        >
            

            <div  
                className='flex flex-col gap-2 w-full'
            >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">

               
    
                    <Image
                        fill
                        alt="Listing"
                        src={data?.imageSrc as string ? data?.imageSrc as string : logoPlaceHolder}
                        className="
                            object-cover 
                            h-full 
                            w-full 
                            group-hover:scale-110 
                            transition
                            "
                            placeholder = 'empty'
                            priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // has "fill" but is missing "sizes" prop. Please add it to improve page performance.
                    />
                    <div className="absolute top-3 right-3">
                        <HeartIconButton 
                            listingId={parseInt(listingId as string)}
                            currentUser={currentUser as any}
                        />
                    </div>
                </div>
                

                <div className="font-semibold text-lg">
                    { data?.streetCity}, { data?.streetZipCode}
                </div>
                <div className="text-white">
                    <span className='font-semibold'>Rooms: </span> <span className='italic'>({data?.roomCount}), </span>
                    <span className='font-semibold'> Guest: </span> <span className='italic'>({data?.guestCount})</span>
                </div>
                <div className="text-white">
                    <span className='font-semibold'>Bathrooms: </span>
                    <span className='italic'>({data?.bathroomCount})</span>
                </div>
                <div className="font-light text-white">
                    <span className='font-semibold'>Property Type: </span>
                    {reservationDate || data?.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light italc"> Day & Night </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel} 
                        onClick={handleCancel}
                    />
                )}

            </div>


            
        </div>
    )
}

export default ListingBapCard