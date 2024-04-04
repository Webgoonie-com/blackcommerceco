'use client'

import React from 'react'
import usePropertyFavorite from '@/Hooks/usePropertyFavorite';
import { currentUser  } from '@/Types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';



interface HeartIconButtonProps {
    listingId: number;
    currentUser?: currentUser
}

const HearticonButton: React.FC<HeartIconButtonProps> = ({
    listingId,
    currentUser
}) => {

    //const hasFavorited = false

    const { hasFavorited, toggleFavorite } = usePropertyFavorite({
        listingId,
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

export default HearticonButton