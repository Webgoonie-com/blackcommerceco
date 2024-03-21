'use client'

import React from 'react'
import useFavorite from '@/Hooks/useFavorite';
import { IUser } from "@/Types/nextauth"
import { SafeUser, User, currentUser  } from '@/Types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import getCurrentUser from "@/Actions/getCurrentUser"

interface HeartIconButtonProps {
    listingId: string;
    currentUser?: User | null
}

const HearticonButton: React.FC<HeartIconButtonProps> = ({
    listingId,
    currentUser
}) => {


    
    // const hasFavorited = false  // when true heart will turn read
    // const toggleFavorite = () => {}

    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser: null
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