"use client";

import React from 'react'

interface CointainerProps {
    children: React.ReactNode
}

const Container: React.FC<CointainerProps> = ({
    children
}) => {
    return (
        <div
            className="
                max-w-[2520px]
                mx-auto
                xl:px-20
                md:px-10
                sm:px-0
                px-0
            "
        >
            {children}
        </div>
    )
}

export default Container