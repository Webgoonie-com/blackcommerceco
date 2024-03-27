'use client'

import React, { useCallback, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { CiForkAndKnife, CiGift, CiCloudMoon, CiMedicalCase } from 'react-icons/ci'
import { ImHappy } from "react-icons/im";
import { FaHotTubPerson, FaScrewdriverWrench, FaTruckPlane, FaTruckRampBox } from 'react-icons/fa6'
import {GiRingmaster, GiHomeGarage } from 'react-icons/gi'
import { FaHandsWash } from 'react-icons/fa';
import { TbChevronDown } from 'react-icons/tb';

import BusinessBox from '../../BusinessBox';
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';


export const businessesCategories = [
    {
        label: 'Dinning',
        icon: CiForkAndKnife,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Shopping',
        icon: CiGift,
        description: 'For Shopping businesses and services!'
    },
    {
        label: 'NightLife',
        icon: CiCloudMoon,
        description: 'For Night Entertainment & NightLife Lifestyle(s)!'
    },
    {
        label: 'Tours',
        icon: GiRingmaster,
        description: 'For Tours And Tour Guides businesses and services!'
    },
    {
        label: 'Activities',
        icon: ImHappy,
        description: 'Fun Activities Even For The Family!'
    },
    {
        label: 'Beauty',
        icon: FaHandsWash,
        description: 'For Beauty, Makeup And Nails businesses and services!'
    },
    {
        label: 'Spas',
        icon: FaHotTubPerson,
        description: 'For Spas And message businesses and services!!'
    },
    {
        label: 'AutoMotive',
        icon: FaScrewdriverWrench,
        description: 'For Automotive related businesses and services!'
    },
    {
        label: 'Transporation',
        icon: FaTruckRampBox,
        description: 'For Transporation related businesses and services!'
    },
    {
        label: 'Travel',
        icon: FaTruckPlane,
        description: 'For Travel businesses and services!'
    },
    {
        label: 'HomeServices',
        icon: GiHomeGarage,
        description: 'For Home related businesses and services!'
    },
    {
        
        label: 'Medical',
        icon: CiMedicalCase,
        description: 'Medical Related business and services!'
    },
    
]

const CategoriesBusinesses = () => {

    const params = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // extract the business from params
    const business = params?.get('category')

     // used by next navigation will get the query url we are on
    const pathname = usePathname()

    const isMainPage = pathname === '/'
    const isBbs = pathname === '/bbs'
    const isBbsPage = pathname === '/bb'

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const handleOpenMenu = () => {

        setIsOpen(false)

    } 
    
    if(isMainPage || isBbsPage){
        return (
            <div className="flex relative self-start">
                <div
                    id="toggleAvtarMenu"
                    onClick={toggleOpen}
                    className={`self-start outline-none border-2 text-white rounded-md hover:bg-gray-900 text-sm font-semibold px-2 py-1 flex items-center gap-3 cursor-pointer transition duration-200
                                ${isOpen ? 'border-purple-600' : 'border-transparent'}`}>
                    <p className='hidden md:block'>
                        Black Businesses
                    </p>
                    <TbChevronDown color='white' />
                </div>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40 w-screen h-screen backdrop-blur-[1.5px]" onClick={() => { setIsOpen(false) }}></div>
                        <div className='grid grid-cols-12 gap-4 bg-gray-900 border border-gray-950 py-4 absolute rounded-md shadow-md w-[22rem] overflow-hidden left-0 top-12 text-sm z-50'>
                            <div className="px-4 pb-3 col-span-10">
                                <p className="text-gray-200 font-semibold">Black Business Selections</p>
                                <p className="text-sm text-gray-400">Browse a curated list of available black businesses</p>
                            </div>
                            
                            <div className="border-t border-gray-700 col-span-12">
                                <div className="px-4 pb-3 pt-3">
                                    <Link  onClick={handleOpenMenu}  href={'/bbs'}>
                                        <p>View (All) - Black Business Everywhere</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="border-t border-gray-700 col-span-12" />
                            <>
                                <div className='col-span-12 md:col-span-12'> 
                                    <div className="px-4 pb-3 pt-3">
                                        <h2>Top Business Categories</h2>
                                    </div>
                                </div>
                                
                                {businessesCategories.slice(0, 5).map((item, i) => (
                                    <div key={item.label} className='col-span-6 md:col-span-4'>
                                        <BusinessBox 
                                            //description={item.description}
                                            selected={business == item.label}
                                            label={item.label}
                                            icon={item.icon}
                                        />
                                    </div>
                                ))}
                                <div className='col-span-6 md:col-span-4'>
                                    <BusinessBox 
                                        key="more"
                                        //description={item.description}
                                        selected={business == 'more'}
                                        label='More'
                                        icon={BiPlus}
                                    />
                                </div>
                            </>
                        </div>
                    </>
                )}
            </div>
        )


    }else if(isBbs){

    

        return (
            <div className="w-full relative clearfix bg-gray-950">

                <div className="w-full pt-4 flex flex-row items-center justify-evenly overflow-x-auto">


                    {businessesCategories.map((item, i) => (
                        <div key={item.label} className='col-span-6 md:col-span-4'>
                            <BusinessBox 
                                //description={item.description}
                                selected={business == item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}

                </div>

            </div>
        )


    
    }
    else if(isBbsPage){

    

        return (
            <div className="flex relative self-start">
                <div
                    id="toggleAvtarMenu"
                    onClick={toggleOpen}
                    className={`self-start outline-none border-2 text-white rounded-md hover:bg-gray-900 text-sm font-semibold px-2 py-1 flex items-center gap-3 cursor-pointer transition duration-200
                                ${isOpen ? 'border-purple-600' : 'border-transparent'}`}>
                    <p className='hidden md:block'>
                        Black Businesses
                    </p>
                    <TbChevronDown color='white' />
                </div>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40 w-screen h-screen backdrop-blur-[1.5px]" onClick={() => { setIsOpen(false) }}></div>
                        <div className='grid grid-cols-12 gap-4 bg-gray-900 border border-gray-950 py-4 absolute rounded-md shadow-md w-[22rem] overflow-hidden left-0 top-12 text-sm z-50'>
                            <div className="px-4 pb-3 col-span-10">
                                <p className="text-gray-200 font-semibold">Black Business Selections</p>
                                <p className="text-sm text-gray-400">Browse a curated list of available black businesses</p>
                            </div>
                            
                            <div className="border-t border-gray-700 col-span-12">
                                <div className="px-4 pb-3 pt-3">
                                    <Link href={'/bbs'}>
                                        <p>View (All) - Black Business Everywhere</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="border-t border-gray-700 col-span-12" />
                            <>
                                <div className='col-span-12 md:col-span-12'> 
                                    <div className="px-4 pb-3 pt-3">
                                        <h2>Top Business Categories</h2>
                                    </div>
                                </div>
                                
                                {businessesCategories.slice(0, 5).map((item, i) => (
                                    <div key={item.label} className='col-span-6 md:col-span-4'>
                                        <BusinessBox
                                            key="more"
                                            description={item.description}
                                            selected={business == item.label}
                                            label={item.label}
                                            icon={item.icon}
                                        />
                                    </div>
                                ))}
                                <div className='col-span-6 md:col-span-4'>
                                    <BusinessBox 
                                        key="more"
                                        //description={item.description}
                                        selected={business == 'more'}
                                        label='More'
                                        icon={BiPlus}
                                    />
                                </div>
                            </>
                        </div>
                    </>
                )}
            </div>
        )


    }
}

export default CategoriesBusinesses