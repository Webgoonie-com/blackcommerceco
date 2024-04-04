import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import  useLoginModal  from '@/Hooks/useLoginModal';
import { currentUser } from '@/Types';




interface useBusinessFavorite {
    listingId: number | string;
    currentUser: currentUser;
}

const useBusinessFavorite = ({
    listingId,
    currentUser,
}: useBusinessFavorite) => {

    
    
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
                request = () => {

                    axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/delBusinessfavorites/${listingId}`, {
                        userId: currentUser?.id,
                        listingId: listingId,
                      })

                }
            }else{
                request =() => {
                    
                    axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/addBusinessfavorites/${listingId}`, {
                        userId: currentUser?.id,
                        listingId: listingId,
                      })

                }
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

export default useBusinessFavorite