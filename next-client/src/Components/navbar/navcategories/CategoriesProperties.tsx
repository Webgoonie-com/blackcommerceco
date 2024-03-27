'use client'

import React, { useCallback, useState } from 'react'

import { IoDiamond } from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach, TbChevronDown, TbMountainOff, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill, GiVillage  } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '@/Components/CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { BiPlus } from 'react-icons/bi'
import Link from 'next/link'
import { CategoriesOnlyProperties } from '@/Components/Categories/CategoriesOnly'

// export const categories = [
//     {
//         label: 'Beach',
//         icon: TbBeach,
//         description: 'This property is close to the beach!'
//     },
//     {
//         label: 'Luxury',
//         icon: IoDiamond,
//         description: 'This property is luxurious!'
//     },
//     {
//         label: 'Modern',
//         icon: MdOutlineVilla,
//         description: 'This property is modern!'
//     },
//     {
//         label: 'Village',
//         icon: GiVillage,
//         description: 'This property is in a village (rural)!'
//     },
//     {
//         label: 'Countryside',
//         icon: TbMountainOff,
//         description: 'This property is in the country side (rural)!'
//     },
//     {
//         label: 'Pools',
//         icon: TbPool,
//         description: 'This property has a pool!'
//     },
//     {
//         label: 'Islands',
//         icon: GiIsland,
//         description: 'This property is on an island!'
//     },
//     {
//         label: 'Lake',
//         icon: GiBoatFishing,
//         description: 'This property is close to a lake!'
//     },
//     {
//         label: 'Sking',
//         icon: FaSkiing,
//         description: 'This property is close to a lake!'
//     },
//     {
//         label: 'Castles',
//         icon: GiCastle,
//         description: 'This property is in a castle!'
//     },
//     {
//         label: 'Camping',
//         icon: GiForestCamp,
//         description: 'This property has camping activities!'
//     },
//     {
//         label: 'Artic',
//         icon: BsSnow,
//         description: 'This property has snow activities!'
//     },
//     {
//         label: 'Cave',
//         icon: GiCaveEntrance,
//         description: 'This property has in a cave!'
//     },
//     {
//         label: 'Desert',
//         icon: GiCactus,
//         description: 'This property is in the desert!'
//     },
//     {
//         label: 'Barn',
//         icon: GiBarn,
//         description: 'This property is in or has a barn!'
//     },
//     {
//         label: 'Windmills',
//         icon: GiWindmill,
//         description: 'This property has Windmills!'
//     },
    
    
    
// ]

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
                                <CategoryBox
                                    pathname={pathname}
                                    description={item.description}
                                    selected={category == item.label}   //This the magic that makes the selected label have a selected underscore in ui
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        ))}
    
                        <div className='col-span-6 md:col-span-4'>
                            <CategoryBox 
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

