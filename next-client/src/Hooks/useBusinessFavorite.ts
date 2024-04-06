import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import  useLoginModal  from '@/Hooks/useLoginModal';
import { currentUser } from '@/Types';




interface IuseBusinessFavorite {
    businessUUId: string;
    currentUser: currentUser;
}

const useBusinessFavorite = ({
    businessUUId,
    currentUser,
}: IuseBusinessFavorite) => {

    
    
    
    const router = useRouter()
    const loginModal =  useLoginModal()

    const reuseUserId = currentUser?.id

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [] as string[];

        //return (list as Array<string | number>).some(id => id === businessUUId);

        return list.includes(businessUUId);

    }, [currentUser, businessUUId]);
    


    // toggle to write on and off
    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {

        e.stopPropagation()

        if(!currentUser){
            // if current user do not exist then open login modal to login.
            return loginModal.onOpen()
        }


        try {
            let request;

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/bbfavorites/${businessUUId}`)
            }else{
                request = () => axios.post(`/api/favorites/bbfavorites/${businessUUId}`)
            }

            await request()

            router.refresh()
            toast.success('Success')

        } catch (error) {
            toast.error('Sorry Something With Terribly Wrong!!!')
        }




    //     try {
    //         let request

    //         // console.log('Line 51 reuseUserId', reuseUserId)

    //         if(hasFavorited){
    //             console.log('Have favorite True')
    //             request = () => {

    //                 axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/delBusinessfavorites/${businessUUId}`, {
    //                     userId: reuseUserId,
    //                     businessUUId: businessUUId,
    //                   })

    //             }
    //         }else{
                
    //             console.log('Have favorite False')

    //             request =() => {
                    
    //                 axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/addBusinessfavorites/${businessUUId}`, {
    //                     userId: reuseUserId,
    //                     businessUUId: businessUUId,
    //                   })

    //             }
    //         }

    //         await request();
    //         router.refresh();
    //         toast.success('Success');

    //     } catch (error) {
    //         toast.error('Something went wrong on handling your favorite.');
    //     }

     }, [businessUUId, currentUser, hasFavorited, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useBusinessFavorite