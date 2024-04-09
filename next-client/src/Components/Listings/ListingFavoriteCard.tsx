'use client'

import React, { useCallback, useMemo } from 'react';

import { SafeUser } from '@/Types';
import useCountries from '@/Hooks/useCountries';
import { useRouter } from 'next/navigation';

import { format } from 'date-fns'
import Image from 'next/image';
import HearticonPropertyButton from '@/Elements/Icons/HeartIconButton/HearticonPropertyButton';
import Button from '@/Elements/Button';

import logo from '../../../public/images/logo.png'

const logoPlaceHolder = `${process.env.NEXT_PUBLIC_URL}` + logo.src



export type ListingFavoriteCardProps = {
    key: any;
    imageSrc?: string | undefined | null;
    data: any;
    reservation?: any;
    //TotalPrice: GLfloat;
    //startDate: Date;
    //endDate: Date;
    actionId: any
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel: string;
    currentUser?: SafeUser | null;
}


const ListingFavoriteCard: React.FC<ListingFavoriteCardProps> =  ({
   
    imageSrc,
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    //startDate,
    //endDate,
    //TotalPrice,
    currentUser
    
}) => {


    console.log('imageSrc', data?.imageSrc as any)

    //console.log('reservationItem totalPrice', TotalPrice.toFixed(2))

    const router = useRouter()

    const { getByValue } = useCountries();

    const propertyUUId = data?.uuid || 0;

    
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

    // const ShowPrice = useMemo(() => {
    //     if(TotalPrice){
    //         return TotalPrice;
    //     }

    //     return  data?.price
    // }, [TotalPrice, data?.price])

    // const reservationDate = useMemo(() => {

    //     if(!reservation){
    //         return null
    //     }

    //     const start = new Date(startDate)
    //     const end = new Date(endDate)

    //     return `${format(start, 'PP')} - ${format(end, 'PP')}`

    // }, [endDate, reservation, startDate])

    return (
        
        <div
            key={reservation.id}
            onClick={() => router.push(`/bap/${data?.uuid}`)} 
            className='col-span-1 cursor-pointer group text-white'
        >
            

            <div  
                className='flex flex-col gap-2 w-full mb-10'
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

export default ListingFavoriteCard