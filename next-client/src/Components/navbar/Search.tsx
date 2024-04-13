"use client"

import useSearchModal from '@/Hooks/useSearchModal'
import useSearchBusinessModal from '@/Hooks/useSearchBusinessModal'
import useSearchPropertyModal from '@/Hooks/useSearchPropertyModal'
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useSearchParams } from 'next/navigation'
import useCountries from '@/Hooks/useCountries'
import { differenceInBusinessDays } from 'date-fns'

const Search = () => {

    const searchModal = useSearchModal()

    const searchPropertyModal = useSearchPropertyModal()

    const searchBusinessModal = useSearchBusinessModal()

    const params = useSearchParams()

    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue')
    const startDate = params.get('startDate')
    const endDate = params.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationLabel = useMemo(() => {
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }

        return 'AnyWhere'

    }, [getByValue, locationValue])

    const durationLabel = useMemo(() => {

        if(startDate && endDate){
            const start = new Date(startDate as string);
            const end = new Date(startDate as string);
            let diff = differenceInBusinessDays(end, start)

            if(diff===0){
                diff = 1
            }

            return `${diff} Days`



        }

        return 'Any Week'

    }, [endDate, startDate])


    const guestLabel = useMemo(() => {
        
        if(guestCount){
            return `${guestCount} Guests`
        }

        return 'Add Guests'
        
    }, [guestCount])
    
    return (
        <div
           
            className="
                hidden md:block
                border-[2px] 
                w-full 
                md:w-auto 
                py-4 
                text-gray-300 
                rounded-full 
                shadow-sm 
                hover:shadow-md 
                transition 
                cursor-pointer
                bg-slate-500
            ">
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                    <div
                        onClick={searchModal.onOpen}
                        className='text-sm font-semibold px-6'>Quick Search</div>
                    <div
                        onClick={searchPropertyModal.onOpen}
                        className='hidden sm:block text-sm font-semibold px-5 border-x-[1px] flex-1 text-center'
                    >
                       Search Properties
                    </div>
                    <div className='text-sm pl-6 pr-6 flex flex-row items-center gap-3'>
                        <div 
                            onClick={searchBusinessModal.onOpen}
                            className='hidden sm:block'>
                            Search Businesses
                        </div>
                       
                        {/* <div className="p-2 bg-purple-500 text-white rounded-full">
                            <BiSearch size={18} />
                        </div> */}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                        <span className='text-sm pl-6 pr-6 flex flex-row items-center gap-3'>{locationLabel}</span>
                        <span className='text-sm pl-6 pr-6 flex flex-row items-center gap-3'>{durationLabel}</span>
                        <span className='text-sm pl-6 pr-6 flex flex-row items-center gap-3'>{guestLabel}</span>
                </div>
            </div>
        </div>
    )
}

export default Search