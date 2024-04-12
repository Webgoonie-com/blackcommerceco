'use client'

import React, { useCallback, useState } from 'react'

import { IoDiamond } from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach, TbChevronDown, TbMountainOff, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill, GiVillage  } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryPropertyBox from '@/Components/Categories/CategoryPropertyBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { BiPlus } from 'react-icons/bi'
import Link from 'next/link'
import { CategoriesOnlyProperties } from '@/Components/Categories/CategoriesOnly'
import { FaHouseUser } from "react-icons/fa6";

const PropertyNavDropDown = () => {

    const params = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // extract the category from params
    const category = params?.get('category')

    // used by next navigation will get the query url we are on
    const pathname = usePathname()

    const isMainPage = pathname === '/'
    const isBapPage = pathname === '/bap'
    const isBapsPage = pathname === '/baps'

    //console.log('pathname', pathname)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    // if(!isBapPage) {
    //     console.log('!isBapPage', isBapPage)
    //     return null
    // }

    const handleOpenMenu = () => {

        setIsOpen(false)

    }

    return (
        <>
        
        {/* className="flex flex-row  w-full relative clearfix bg-gray-950" */}

        

        <div className="flex relative self-start">

            <div
                id="toggleAvtarMenu"
                onClick={toggleOpen}
                className={`
                    md:ms-5
                    md:me-5
                    self-start
                    outline-none
                    border-2
                    text-white
                    rounded-md
                    hover:bg-gray-900
                    text-sm
                    font-semibold
                    px-2
                    py-1
                    flex
                    items-center
                    gap-3
                    cursor-pointer
                    transition 
                    duration-200
                    ${isOpen ? 'border-purple-600' : 'border-transparent'}`}>
                <span className='p-0'>
                    <FaHouseUser size={36} />
                    <span className=" text-xs md:block sm:text-sm md:text-lg"> Properties </span>
                </span>
                
                <TbChevronDown className="left-0" color='white' />

            </div>


            {isOpen && (
                <>
                    
                    {/* {backdrop-blur-[10.5px]} */}

                    <div
                        className="
                            fixed inset-0 z-40 
                            h-screen w-screen 
                            
                            " 
                            
                            onClick={() => { 
                                setIsOpen(false) 
                            }}>        
                    </div>
                    
                    <div className='absolute
                                    top-20
                                    sm:top-20
                                    md:top-24
                                    left-1 
                                    md:-ml-4
                                    grid grid-cols-12 gap-4
                                    bg-gray-900 border border-gray-800 
                                    py-4  rounded-md shadow-md 
                                    w-[22rem] overflow-hidden 
                                     text-sm z-50'>

                                <div className="px-4 pb-3 col-span-10">
                                    <p className="text-gray-200 font-semibold">View Black Air Property Categories</p>
                                    <p className="text-sm text-gray-400">Browse a curated list of available black air properties </p>
                                </div>
                        
                                <div className="border-t border-gray-700 col-span-12">
                                    <div className="px-4 pb-3 pt-3">
                                        <Link onClick={handleOpenMenu} href={'/baps'}>
                                            <p className="underline underline-offset-8">View (All) Black Air Propertiies</p>
                                        </Link>
                                    </div>
                                </div>

                                <div className="border-t border-gray-700 col-span-12">
                                <>
                                    <div className='col-span-12 md:col-span-12'> 
                                        <div className="px-4 pb-3 pt-3">
                                            <h2>Top Property Categories</h2>
                                        </div>
                                    </div>
                                </>
                                </div>
                
                                {CategoriesOnlyProperties.slice(0, 5).map((item) => (
                                    <div key={item.label} className='col-span-6 md:col-span-4'>
                                        <CategoryPropertyBox 
                                            key="more"
                                            description={item.description}
                                            selected={category == item.label}
                                            label={item.label}
                                            icon={item.icon}
                                        />
                                    </div>
                                ))}
                                <div className='col-span-6 md:col-span-4'>
                                    <CategoryPropertyBox 
                                        key="more"
                                        //description={item.description}
                                        selected={category == 'more'}
                                        label='More'
                                        icon={BiPlus}
                                    />
                                </div>
                    </div>
                    
                </>
            )}
        </div>
    
        
   </>
    )
}

export default PropertyNavDropDown