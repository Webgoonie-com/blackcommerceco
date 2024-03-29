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


export const CategoriesProperties  = () => {
//const CategoriesProperties = () => {

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

    
    
   if(!isMainPage && isBapPage || isBapsPage ){

    
        return (
           <>
                
                
                <div className=" flex flex-row w-full relative clearfix bg-gray-950">
    
                    <div className="w-full pt-4 flex flex-row items-center justify-evenly overflow-x-auto">
                        
                        {CategoriesOnlyProperties.map((item) => (
                            <div key={item.label} className='col-span-6 md:col-span-4'>
                                <CategoryPropertyBox
                                    pathname={pathname}
                                    description={item.description}
                                    selected={category == item.label}   //This the magic that makes the selected label have a selected underscore in ui
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        ))}
    
                        <div className='col-span-6 md:col-span-4'>
                            <CategoryPropertyBox 
                                pathname={pathname}
                                key="more"
                                //description={item.description}
                                selected={category == 'more'}
                                label='More'
                                icon={BiPlus}
                            />
                        </div>
    
                    </div>
    
                </div>
                
                
                
           </>
        )
    }

    

    return null
}

