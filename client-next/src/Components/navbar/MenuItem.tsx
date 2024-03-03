"use client"

import React from 'react'

interface MenuItemProps {
    onClick: () => void
    label: string
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
    return (
        <div
            onClick={onClick} 
            className="px-4 py-3 hover:bg-purple-800 text-sky-400/100 text-sm transition hover:cursor-pointer border-bottom-1"
        >
            {label}
        </div>
    )
}

export default MenuItem