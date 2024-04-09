'use client'

import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { CurrentUser, IUser } from '@/Types/nextauth';
import { CountryStateRegion, currentUser, User } from '@/Types';
import useCountries from '@/Hooks/useCountries';
import { useRouter } from 'next/navigation';

import { format } from 'date-fns'
import Image from 'next/image';
import HearticonPropertyButton from '@/Elements/Icons/HeartIconButton/HearticonPropertyButton';
import Button from '@/Elements/Button';

import usePropertyFavorite from '@/Hooks/usePropertyFavorite';
import getCurrentUser from "@/Actions/getCurrentUser"

//import logo from '../../../public/images/logo.png'
import logo from '../../../public/images/logo.png'

const logoPlaceHolder = `${process.env.NEXT_PUBLIC_URL}` + logo.src



export type ListingTripCardProps = {
    key: any;
    imageSrc: string;
    data: any;
    reservation: any;
    startDate: Date;
    endDate: Date;
    actionId: any
    onAction?: any;
    disabled?: any;
    actionLabel: String;
    currentUser: currentUser;
}


const ListingTripCard: React.FC<ListingTripCardProps> =  ({
   
    imageSrc,
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    startDate,
    endDate,
    currentUser
    
}) => {

    
    // console.log('ListingTripCard')
    // console.log('ListingTripCard imageSrc:', imageSrc)
    // console.log('ListingTripCard reservation:', reservation)
    // console.log('ListingTripCard startDate:', startDate)
    // //console.log('ListingTripCard endDate:', endDate: { endDate: Date } )
    // console.log('ListingTripCard endDate:', endDate as any)
    

    const router = useRouter()

    const { getByValue } = useCountries();

    const propertyUUId = data?.uuid || 0;

    // console.log('listingData', data)
    
    // console.log('propertyUUId', propertyUUId)
    
    const location = getByValue(data?.locationValue || '');
    


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

        //console.log('reservation?.reservationProperty?.startDate', reservation?.startDate)
        //console.log('reservation?.reservationProperty?.endDate', reservation.endDate)
        //console.log('reservation?.Reservation?.startDate', reservation)

        const start = new Date(reservation?.startDate)
        const end = new Date(reservation?.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])

    // console.log('Line 191 data Bap Listing', data)

    return (
        
        <div
            key={reservation.id}
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
                        src={imageSrc as string ? imageSrc as string : logoPlaceHolder}
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
                        
                        {/* {JSON.stringify(currentUser) as any} */}
                        
                        <HearticonPropertyButton 
                            propertyUUId={propertyUUId as string}
                            currentUser={currentUser as any}
                        />

                    </div>
                </div>
                

                <div className="font-semibold text-lg">
                    { data?.streetCity },{" "}
                    { data?.countryStateRegion?.name }{" "}
                    { data?.streetZipCode }
                </div>
                {/* <div className="font-semibold text-lg">
                    { data?.country?.region },{" "}
                    { data?.streetZipCode }
                </div> */}
                <div className="text-white">
                    <span className='font-semibold'> Guest: </span> <span className='italic'>({data?.guestCount}), </span>
                    <span className='font-semibold'>Rooms: </span> <span className='italic'>({data?.roomCount}) </span>
                </div>
                <div className="text-white">
                    <span className='font-semibold'>Bathrooms: </span>
                    <span className='italic'>({data?.bathroomCount})</span>
                </div>
                <div className="font-light text-white">
                    <span className='font-semibold'>Date(s): </span>
                    {reservationDate || data?.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    Total Due:
                    <div className="font-semibold">
                     $ {parseFloat(data?.price).toFixed(2)}
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

export default ListingTripCard