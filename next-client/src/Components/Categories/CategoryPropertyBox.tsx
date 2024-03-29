"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface CategoryPropertyBoxProps {
    icon: IconType
    label: string
    pathname?: string
    description?: string
    selected?: boolean
}

const CategoryPropertyBox: React.FC<CategoryPropertyBoxProps> = ({
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
        //console.log('parmas are', params)

        if (params) {
            currentQuery = qs.parse(params.toString())
            //console.log('currentQuery',  currentQuery)
        }

        // This make the current clicked category to be in the url
        const updatedQeury: any = {
            ...currentQuery,
            category: label
        }

        // Scroll to section if we click on more
        if (label === 'More') {
            const element = document.getElementById("allCategoriesSection");
            
            element?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            
            delete updatedQeury.category
        }
        else {
            // lets check if already clicked on category to set and rest upon select like a toogle
            // after checking we remove it from view by its label
            if (params?.get('category') === label) {
                delete updatedQeury.category
            }

            const url = qs.stringifyUrl({
                url: '/baps/',
                query: updatedQeury
            }, { skipNull: true })
    
            router.push(url);
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

export default CategoryPropertyBox