"use client"

import React, { useCallback, useState } from 'react'

import { TbChevronDown} from 'react-icons/tb'


import { usePathname, useSearchParams } from 'next/navigation'
import { BiPlus } from 'react-icons/bi'
import Link from 'next/link'


import { CategoriesOnlyBusinesses } from '@/Components/Categories/CategoriesOnly';
import CategoryBusinessBox from '@/Components/Categories/CategoryBusinessBox'
import { IoMdBusiness } from 'react-icons/io'

const BusinessNavDropDown = () => {

    const params = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    // extract the category from params
    const business = params?.get('category')

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
                     
            <div className="flex relative self-start">
                <div
                    id="toggleAvtarMenu"
                    onClick={toggleOpen}
                    className={`me-5
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
                    
                    <span className="">
                        <IoMdBusiness size={36} />
                        <span className=" text-xs md:block sm:text-sm md:text-lg"> Businesses</span>
                    </span>

                    <TbChevronDown color='white' />

                </div>

                {isOpen && (
                    <>

                        {/* {backdrop-blur-[10.5px]} */}
                        <div className="
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
                                        left-0
                                    
                                        -ml-24
                                        sm:-md-40
                                        md:ml-0
                                        grid grid-cols-12 gap-4
                                        bg-gray-900 border border-gray-950
                                        py-4 rounded-md shadow-md 
                                        w-[22rem] overflow-hidden
                                        text-sm z-50'>

                            <div className="px-4 pb-3 col-span-10">
                                <p className="text-gray-200 font-semibold">Black Business Selections</p>
                                <p className="text-sm text-gray-400">Browse a curated list of available black businesses...</p>
                            </div>
                            
                            <div className="border-t border-gray-700 col-span-12">
                                <div className="px-4 pb-3 pt-3">
                                    <Link className='' onClick={handleOpenMenu} href={'/bbs'}>
                                        <p className="underline underline-offset-8">View (All) - Black Businesses</p>
                                        
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
                                
                                {CategoriesOnlyBusinesses.slice(0, 5).map((item, i) => (
                                    <div key={item.label} className='col-span-6 md:col-span-4'>
                                        <CategoryBusinessBox
                                            key="more"
                                            description={item.description}
                                            selected={business == item.label}
                                            label={item.label}
                                            icon={item.icon}
                                        />
                                    </div>
                                ))}
                                <div className='col-span-6 md:col-span-4'>
                                    <CategoryBusinessBox 
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
        
        </>
    )
}

export default BusinessNavDropDown