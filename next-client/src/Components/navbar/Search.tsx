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
    const queryStatus = params?.get('queryStatus')

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
                        onClick={searchPropertyModal.onOpen} 
                        className="px-4 p-2 mx-2 bg-purple-500 text-white rounded-full cursor-pointer">
                        <BiSearch size={18} />
                    </div>
                    <div onClick={searchPropertyModal.onOpen}
                        className="hidden sm:block text-sm font-semibold pr-3 cursor-pointer"
                    >
                        Search Properties 
                    </div>
                    <div onClick={searchBusinessModal.onOpen}
                        className='hidden sm:block pl-3 text-sm font-semibold border-l-[1px] flex-1 text-center cursor-pointer'
                    >
                        Search Businesses
                    </div>
                    <div
                        onClick={searchBusinessModal.onOpen}
                        className="px-4 p-2 mx-2 bg-purple-500 text-white rounded-full cursor-pointer">
                                <BiSearch size={18} />
                    </div>
                    {/* 
                        <div className='text-sm  font-semibold  pl-6 pr-6 flex flex-row items-center gap-3'>

                            <div 
                                onClick={searchModal.onOpen}
                                className='hidden sm:block'>
                                Search Professionals 
                            </div>
                        
                            <div className="p-2 bg-purple-500 text-white rounded-full">
                                <BiSearch size={18} />
                            </div>

                        </div>
                    */}
                </div>

                {queryStatus ? (
                    <div className="flex flex-row items-center justify-stretch">
                        <span className='text-sm pl-6 pr-6 flex flex-row items-stretch gap-3'>Searched Properties:</span>
                        <span className='text-sm pl-6 pr-6 flex flex-row items-stretch gap-3'>{locationLabel}</span>
                        <span className='text-sm pl-6 pr-6 flex flex-row items-stretch gap-3'>{durationLabel}</span>
                        <span className='text-sm pl-6 pr-6 flex flex-row items-stretch gap-3'>{guestLabel}</span>
                    </div>
                ) : null}
                
            </div>
        </div>
    )
}

export default Search