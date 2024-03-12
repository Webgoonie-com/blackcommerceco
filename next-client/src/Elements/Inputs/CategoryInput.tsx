"use client"

import React from 'react'
import { IconType } from 'react-icons';


interface CatergoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CatergoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            
            className={`
                text-white
                rounded-xl
                border-2
                p-4
                flex flex-col
                gap-3
                hover:border-pink-400
                transition
                cursor-pointer
                ${selected ? 'border-pink-900' : 'border-neutral-200'}
            `}
            
        >
            <Icon size={30} />
            <div
                className='font-semibold'
            >
                {label}
            </div>
        </div>
    )
}

export default CategoryInput