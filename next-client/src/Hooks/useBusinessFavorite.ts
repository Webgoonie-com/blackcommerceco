import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import  useLoginModal  from '@/Hooks/useLoginModal';
import { currentUser } from '@/Types';

import { useSession } from'next-auth/react'


interface IuseBusinessFavorite {
    businessUUId: string;
    currentUser?: currentUser | null;
}

const useBusinessFavorite = ({
    businessUUId,
    currentUser,
}: IuseBusinessFavorite) => {

    
    const { data: session, update } = useSession()
    
    const router = useRouter()
    const loginModal =  useLoginModal()

    const reuseUserId = currentUser?.id

    const hasFavorited = useMemo(() => {

        const list = session?.user?.favoriteBbUuids || '' as string;
       
        // const list = currentUser?.favoriteBbUuids || '' as string;

        // console.log('log list', list)
        // console.log('log list businessUUId', businessUUId)
        // console.log('list.includes(favoriteBbUuids)', list.includes(businessUUId))

        //return (list as Array<string | number>).some(id => id === businessUUId);

        return list.includes(businessUUId);

    }, [businessUUId, session?.user?.favoriteBbUuids]);
    


    // toggle to write on and off
    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {

        e.stopPropagation()

        async function updateAddSession(session: any, businessUUId: string){
        
            
            
    
            let currentList = session?.user?.favoriteBbUuids; 
    
            let concating
    
            if(currentList && currentList.length > 1){
                concating = currentList+businessUUId+','
              }else{
                concating = businessUUId+','
              }
    
            await update({
                ...session,
                user: {
                    ...session?.user,
                    favoriteBbUuids: concating
                }
            })
    
        }
    
        async function updateRemoveSession(session: any, businessUUId: string){
                
            let currentlist = session?.user?.favoriteBbUuids;
    
            const textToReplace = businessUUId+','; // we will replace : with div spacer
    
            const newList = currentlist.split(textToReplace).join('');
    
            let concating
    
            concating = newList
            
            await update({
                ...session,
                user: {
                    ...session?.user,
                    favoriteBbUuids: newList
                }
            })
    
        }

        if(!currentUser){
            // if current user do not exist then open login modal to login.
            return loginModal.onOpen()
        }


        try {
            let request;

            if(hasFavorited){
                
                updateRemoveSession(session, businessUUId)

                request = () => axios.delete(`/api/favorites/bbfavorites/${businessUUId}`)
            }else{

                updateAddSession(session, businessUUId)
                
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