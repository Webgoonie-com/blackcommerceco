"use client"

import React from 'react'
import Image from "next/image"

interface AvatarProps {
    src?: string | null | undefined
    sqPixels?: number | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    sqPixels
}) => {
    return (
        <Image
            className="rounded-full"
            height={sqPixels ? sqPixels : "30"}
            width={sqPixels ? sqPixels : "30"}
            alt="Avatar"
            src={src || "/images/userPlaceholder.jpg"}
        />
    )
}

export default Avatar