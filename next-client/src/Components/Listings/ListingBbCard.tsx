'use client'

import React, { useCallback, useMemo } from 'react';
import { Businesses, Country, CountryStateRegion, currentUser, User } from '@/Types';
import { useRouter } from 'next/navigation';

import useCountries from '@/Hooks/useCountries';
import { format } from 'date-fns'

import Image from 'next/image';
import HearticonBusinessButton from '@/Elements/Icons/HeartIconButton/HearticonBusinessButton';
import Button from '@/Elements/Button';

import { ListingBbCardProps } from '@/Types/index'

import logo from '../../../public/images/logo.png'

const logoPlaceHolder = `${process.env.NEXT_PUBLIC_URL}` + logo.src






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

    const businessUUId = data?.uuid || 0;
    console.log('Line 42 businessUUId  ', businessUUId)

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

        return  data?.Businesses?.sellPrice
    }, [reservation,  data?.Businesses?.sellPrice])

    const reservationDate = useMemo(() => {

        if(!reservation){
            return null
        }


        const start = new Date(reservation?.Reservation?.startDate)
        const end = new Date(reservation?.Reservation?.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])

    // console.log('Line 151 data Bap Listing', data)

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
               
                        <HearticonBusinessButton 
                            businessUUId={businessUUId as string}
                            currentUser={currentUser as any}
                        />

                    </div>
                </div>

                <div className="font-semibold text-lg">
                    { data?.streetCity },{" "}
                    { data?.countryStateRegion?.name }{" "}
                </div>
                <div className="font-semibold text-lg">
                    { data?.country?.region },{" "}
                    { data?.streetZipCode }
                </div>
                <div className="font-light text-white">
                    Category: {data?.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    {sellPrice && (
                        <>
                            <div className="font-light">For Sale</div>
                                <div className="font-semibold">
                                    $ {sellPrice}
                                </div>
                        </>
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