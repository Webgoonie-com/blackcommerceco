"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface BusinessBoxProps {
    icon: IconType
    label: string
    pathname?: string
    description?: string
    selected?: boolean
}

const BusinessBox: React.FC<BusinessBoxProps> = ({
    icon: Icon,
    pathname,
    label,
    selected
}) => {
    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = {};

        // This gives the ability to combine of ton of parameters upon click
        if (params) {
            currentQuery = qs.parse(params.toString())
            //console.log('currentQuery',  currentQuery)
        }

        const updatedQeury: any = {
            ...currentQuery,
            business: label
        }

        // Scroll to section if we click on more
        if (label === 'More') {
            

            const element = document.getElementById("allBusinessesSection");
            
            element?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            
            // if(element)
            // {
            // }

            delete updatedQeury.business
        }
        else {
            // lets check if already clicked on business to set and rest upon select like a toogle
            // after checking we remove it from view by its label
            if (params?.get('business') === label) {
                delete updatedQeury.business
            }

            const url = qs.stringifyUrl({
                url: '/bbs/',
                query: updatedQeury
            }, { skipNull: true })
    
            router.push(url)
        }

    }, [label, params, router])

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                flex-col
                items-center
                justify-center
                gap-2
                p-3
                border-b-2
                hover:text-gray-100
                transition
                duration-200
                cursor-pointer
                ${selected ? 'border-b border-purple-600' : 'border-transparent'}
                ${selected ? 'text-gray-200' : 'text-gray-400'}
            `}
        >
            
            <Icon size={26} />
            <div className='font-medium text-sm'>
                {label}
            </div>
        </div>
    )
}

export default BusinessBox