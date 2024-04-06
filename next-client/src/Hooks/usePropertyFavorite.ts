import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import  useLoginModal  from '@/Hooks/useLoginModal';
import { currentUser } from '@/Types';




interface usePropertyFavorite {
    propertyUUId: number | string;
    currentUser: currentUser;
}

const usePropertyFavorite = ({
    propertyUUId,
    currentUser,
}: usePropertyFavorite) => {

    
    console.log('Line 25 usePropertyFavorite listingId', propertyUUId)
    
    const router = useRouter()
    const loginModal =  useLoginModal()

    const reuseUserId = currentUser?.id

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return (list as Array<string | number>).some(id => id === propertyUUId);
    }, [currentUser?.favoriteIds, propertyUUId]);
    


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

                    axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/delPropertyfavorites/${propertyUUId}`, {
                        userId: reuseUserId,
                        propertyUUId: propertyUUId,
                      })

                }
            }else{
                request =() => {
                    
                    axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/addPropertyfavorites/${propertyUUId}`, {
                        userId: currentUser?.id,
                        propertyUUId: propertyUUId,
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
        propertyUUId, 
        loginModal,
        router
    ])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default usePropertyFavorite