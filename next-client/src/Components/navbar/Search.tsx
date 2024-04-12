"use client"

import useSearchModal from '@/Hooks/useSearchModal'
import useSearchBusinessModal from '@/Hooks/useSearchBusinessModal'
import useSearchPropertyModal from '@/Hooks/useSearchPropertyModal'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {

    const searchModal = useSearchModal()

    const searchPropertyModal = useSearchPropertyModal()

    const searchBusinessModal = useSearchBusinessModal()
    
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
            ">
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
                <div className='text-sm pl-6 pr-2 flex flex-row items-center gap-3'>
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
        </div>
    )
}

export default Search