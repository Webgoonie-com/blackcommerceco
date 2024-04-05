'use client'

import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { CurrentUser, IUser } from '@/Types/nextauth';
import { currentUser, User } from '@/Types';
import useCountries from '@/Hooks/useCountries';
import { useRouter } from 'next/navigation';

import { format } from 'date-fns'
import Image from 'next/image';
import HearticonBusinessButton  from '@/Elements/Icons/HeartIconButton/HearticonBusinessButton';
import HeartPropertyButton  from '@/Elements/Icons/HeartIconButton/HearticonPropertyButton';
import Button from '@/Elements/Button';


interface Property {
    id: number;
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

interface ListingCardProps {
    data: {
        id: number;
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
        imageSrc: string;
        category: string;
        title: string;
        description: string;
        locationValue: string;
        Businesses: Businesses;
        updatedAt: Date;

    } | null;
    reservation?: {
        Reservation: Reservation;
    } | null;
    onAction?: (Id: string) => void;
    disabled?: boolean
    actionLabel?: string;
    actionId?: string;
    //currentUser?: IUser | null
    currentUser?: currentUser | null

}

const ListingCard: React.FC<ListingCardProps> =  ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
    
}) => {

    
    console.log('Line 120 on ListingCard Data', data)
    

    const router = useRouter()
    const { getByValue } = useCountries();

    const listingId = data?.uuid || 0;
    
    //const location = data?.Property?.locationValue || '';

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

        return  data?.Property?.price
    }, [reservation,  data?.Property?.price])

    const reservationDate = useMemo(() => {

        if(!reservation){
            return null
        }


        const start = new Date(reservation?.Reservation?.startDate)
        const end = new Date(reservation?.Reservation?.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])

    
     {console.log('JSON.stringify(data)' + JSON.stringify(data))}
    
    return (
        
        <div
            onClick={() => router.push(`/bbs/${data?.uuid}`)} 
            className='col-span-1 cursor-pointer group text-white'
        >
            

            <div  
                className='flex flex-col gap-2 w-full'
            >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">

               
    
                    <Image
                        fill
                        alt="Listing"
                        src={`${data?.imageSrc}`}
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
                        <HearticonBusinessButton 
                            listingId={parseInt(listingId as any)}
                            currentUser={currentUser as any}
                        />
                    </div>
                </div>

                <div className="font-semibold text-lg">
                    { data?.title}, { data?.description}
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-white">
                    {reservationDate || data?.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
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

export default ListingCard