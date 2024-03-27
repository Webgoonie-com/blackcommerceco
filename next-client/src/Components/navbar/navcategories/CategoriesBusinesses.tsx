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
import { CategoriesOnlyBusinesses } from '@/Components/Categories/CategoriesOnly';



export const CategoriesBusinesses = () => {

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

    if(!isMainPage && isBbsPage || isBbs){
        return (
            <div className="w-full relative clearfix bg-gray-950">

                    <div className="w-full pt-4 flex flex-row items-center justify-evenly overflow-x-auto">


                        {CategoriesOnlyBusinesses.map((item, i) => (
                            <div key={item.label} className='col-span-6 md:col-span-4'>
                                <BusinessBox
                                    pathname={pathname}
                                    description={item.description}
                                    selected={business == item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        ))}

                            <div  className='col-span-6 md:col-span-4'>
                                <BusinessBox
                                    pathname={pathname}
                                    key="more"
                                    // description={item.description}
                                    selected={business == "more"}
                                    label={"More"}
                                    icon={BiPlus}
                                />
                            </div>

                    </div>

                </div>
        )
    }
    
}

export default CategoriesBusinesses