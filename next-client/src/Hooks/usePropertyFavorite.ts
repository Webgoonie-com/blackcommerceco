import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import  useLoginModal  from '@/Hooks/useLoginModal';
import { currentUser, SafeUser } from '@/Types';




interface IusePropertyFavorite {
    propertyUUId: string;
    currentUser?: currentUser | null;
}

const usePropertyFavorite = ({
    propertyUUId,
    currentUser,
}: IusePropertyFavorite) => {

    
    // console.log('Line 25 usePropertyFavorite listingId', propertyUUId)
    
    const router = useRouter()
    const loginModal =  useLoginModal()

    const reuseUserId = currentUser?.id

    const hasFavorited = useMemo(() => {

        const list = currentUser?.favoriteUuids || '';

        console.log('log list', list)
        console.log('log list propertyUUId', propertyUUId)
        console.log('list.includes(propertyUUId)', list.includes(propertyUUId))
        
        //return (list as Array<string | number>).some(id => id === propertyUUId);

        return list.includes(propertyUUId);
        
    }, [currentUser, propertyUUId]);
    
    console.log('hasFavorited', hasFavorited)

    // // toggle to write on and off
    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {

        console.log('Result of e: -- ', e)
        e.stopPropagation()

        if(!currentUser){
            // if current user do not exist then open login modal to login.
            return loginModal.onOpen()
        }

        try {

            let request;

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/bapfavorites/${propertyUUId}`)
                console.log('hasFavorited', request)
            }else{
                request = () => axios.post(`/api/favorites/bapfavorites/${propertyUUId}`)
                console.log('hasNotFavorited', request)
            }

            await request()

            router.refresh()
            toast.success('Success')

        } catch (error) {
            toast.error('Sorry Something With Terribly Wrong!!!')
        }


        // try {
        //     let request

        //     if(hasFavorited){
        //         request = () => {

        //             axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/delPropertyfavorites/${propertyUUId}`, {
        //                 userId: reuseUserId,
        //                 propertyUUId: propertyUUId,
        //               })

        //         }
        //     }else{
        //         request =() => {
                    
        //             axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/addPropertyfavorites/${propertyUUId}`, {
        //                 userId: currentUser?.id,
        //                 propertyUUId: propertyUUId,
        //               })

        //         }
        //     }

        //     await request();
        //     router.refresh();
        //     toast.success('Success');

        // } catch (error) {
        //     toast.error('Something went wrong on handling your favorite.');
        // }

    }, [currentUser, hasFavorited, loginModal, propertyUUId, router])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default usePropertyFavorite