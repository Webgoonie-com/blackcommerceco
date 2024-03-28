'use client'

import React, { useCallback, useMemo } from 'react';
import { currentUser, User } from '@/Types';
import { useRouter } from 'next/navigation';

import useCountries from '@/Hooks/useCountries';
import { format } from 'date-fns'

import Image from 'next/image';
import HeartIconButton from '@/Elements/Icons/HeartIconButton';
import Button from '@/Elements/Button';


import logo from '../../../public/images/logo.png'

const logoPlaceHolder = `${process.env.NEXT_PUBLIC_URL}` + logo.src



interface Business {
    uuid: string;
    token: string;
    acctStatus: number;
    namePublicDisplay: string;
    nameDBA: string;
    nameLegal: string;
    imageSrc: string | null | undefined;
    isAFranchise: number;
    isTheFranchiseParent: number;
    ownsOtherBusinesses: number;
    taxNumber: string;
    sellPrice: number;
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

interface ListingBbCardProps {
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
        Business: Business;
        imageSrc: string;
        category: string;
        title: string;
        description: string;
        locationValue: string;
        updatedAt: Date;
       
    } | null;
    reservation?: {
        Reservation: Reservation;
    } | null;
    onAction?: (Id: string) => void;
    disabled?: boolean
    actionLabel?: string;
    actionId?: string;
    currentUser: currentUser | null

}

const ListingBbCard: React.FC<ListingBbCardProps> =  ({
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

    const sellPrice = useMemo(() => {
        if(reservation){
            return reservation?.Reservation?.totalPrice;
        }

        return  data?.Business?.sellPrice
    }, [reservation,  data?.Business?.sellPrice])

    const reservationDate = useMemo(() => {

        if(!reservation){
            return null
        }


        const start = new Date(reservation?.Reservation?.startDate)
        const end = new Date(reservation?.Reservation?.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])

    
    return (
        
        <div
            onClick={() => router.push(`/bb/${data?.uuid}`)} 
            className='col-span-1 cursor-pointer group text-white'
        >
            

            <div id={"card"}
                className='flex flex-col gap-2 w-full'
            >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">

               
    
                    <Image
                        fill
                        alt="Business Listing"
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
                        $ {sellPrice}
                    </div>
                    {!reservation && (
                        <div className="font-light">By Owner</div>
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

export default ListingBbCard