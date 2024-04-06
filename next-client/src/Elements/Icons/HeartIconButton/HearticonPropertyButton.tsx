'use client'

import React from 'react'
import usePropertyFavorite from '@/Hooks/usePropertyFavorite';
import { currentUser  } from '@/Types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';



interface HearticonPropertyButtonProps {
    propertyUUId: any;
    currentUser?: currentUser
}

const HearticonPropertyButton: React.FC<HearticonPropertyButtonProps> = ({
    propertyUUId,
    currentUser
}) => {

    console.log('Line 20 listingId', propertyUUId)
    console.log('Line 20 currentUser', currentUser)
    //const hasFavorited = false

    const { hasFavorited, toggleFavorite } = usePropertyFavorite({
        propertyUUId: propertyUUId,
        currentUser: currentUser as any,
    })


    return (
        <div
            onClick={toggleFavorite}
            className="
                relative hover:opacity-80 transition cursor-pointer
            "
        >
            <AiOutlineHeart size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart size={24}
                className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
            />
        </div>
    )
}

export default HearticonPropertyButton