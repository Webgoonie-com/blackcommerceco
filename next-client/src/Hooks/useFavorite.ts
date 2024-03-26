import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { IUser } from '@/Types/nextauth';
import getCurrentUser from "@/Actions/getCurrentUser"

import  useLoginModal  from '@/Hooks/useLoginModal';
import { User, currentUser } from '@/Types';



interface useFavorite {
    listingId: number | string;
    currentUser: User;
}

const useFavorite = ({
    listingId,
    currentUser
}: useFavorite) => {

    //const currentUser = getCurrentUser();

    console.log('currentUser: ', currentUser)
    
    const router = useRouter()
    const loginModal =  useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return (list as Array<string | number>).some(id => id === listingId);
    }, [currentUser?.favoriteIds, listingId]);
    


    // toggle to write on and off
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if(!currentUser){
            // if current user do not exist then open login modal to login.
            return loginModal.onOpen()
        }


        try {
            let request

            if(hasFavorited){
                request = () => axios.delete(process.env.NEXT_PUBLIC_API_URL + `/api/listing/favorites/${listingId}`)
            }else{
                request =() => axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listing/favorites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success('Success');

        } catch (error) {
            toast.error('Something went wrong on handling your favorite.');
        }

    }, [
        currentUser, 
        hasFavorited, 
        listingId, 
        loginModal,
        router
    ])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite