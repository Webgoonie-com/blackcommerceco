'use client'

import React, { useCallback, useState } from 'react'

import { IoDiamond } from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach, TbChevronDown, TbMountainOff, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill, GiVillage  } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '../../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { BiPlus } from 'react-icons/bi'
import Link from 'next/link'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Luxury',
        icon: IoDiamond,
        description: 'This property is luxurious!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Village',
        icon: GiVillage,
        description: 'This property is in a village (rural)!'
    },
    {
        label: 'Countryside',
        icon: TbMountainOff,
        description: 'This property is in the country side (rural)!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Sking',
        icon: FaSkiing,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities!'
    },
    {
        label: 'Artic',
        icon: BsSnow,
        description: 'This property has snow activities!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property has in a cave!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barn',
        icon: GiBarn,
        description: 'This property is in or has a barn!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has Windmills!'
    },
    
    
    
]

const CategoriesProperties = () => {

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

    
    
    if(isMainPage){


    
        return (
            <div className="relative">
                <div
                    id="toggleAvtarMenu"
                    onClick={toggleOpen}
                    className={`ms-28 outline-none border-2 text-white rounded-md hover:bg-gray-900 text-sm font-semibold px-2 py-1 flex items-center gap-3 cursor-pointer transition duration-200
                                ${isOpen ? 'border-purple-600' : 'border-transparent'}`}>
                    <p className='block'>
                        Black Air Properties 
                    </p>
                    <TbChevronDown color='white' />
                </div>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40 h-screen w-screen backdrop-blur-[1.5px]" onClick={() => { setIsOpen(false) }}></div>
                        <div className='grid grid-cols-12 gap-4 bg-gray-900 border border-gray-800 py-4 absolute rounded-md shadow-md w-[22rem] overflow-hidden left-0 top-12 text-sm z-50'>
                            <div className="px-4 pb-3 col-span-10">
                                <p className="text-gray-200 font-semibold">View Black Air Property Categories</p>
                                <p className="text-sm text-gray-400">Browse a curated list of available black air properties </p>
                            </div>
                            
                            <div className="border-t border-gray-700 col-span-12">
                                <div className="px-4 pb-3 pt-3">
                                    <Link href={'/baps'}>
                                        <p>View (All) Black Air Propertiies</p>
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
                    
                                    {categories.slice(0, 5).map((item) => (
                                        <div key={item.label} className='col-span-6 md:col-span-4'>
                                            <CategoryBox 
                                                //description={item.description}
                                                selected={category == item.label}
                                                label={item.label}
                                                icon={item.icon}
                                            />
                                        </div>
                                    ))}
                                    <div className='col-span-6 md:col-span-4'>
                                        <CategoryBox 
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
        )

    }else if(isBapPage || isBapsPage){

    
        return (
            <div className="w-full relative clearfix bg-gray-950">
                <div className="w-full pt-4 flex flex-row items-center justify-evenly overflow-x-auto">
                    {/* {categories.slice(0, 5).map((item) => ( */}
                    {categories.map((item) => (
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
        )
    }

    

    return null
}

export default CategoriesProperties