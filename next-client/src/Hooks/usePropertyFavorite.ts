"use client"

import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import  useLoginModal  from '@/Hooks/useLoginModal';
import { currentUser, SafeUser } from '@/Types';

import { useSession } from'next-auth/react'


interface IusePropertyFavorite {
    propertyUUId: string;
    currentUser?: currentUser | null;
}

const usePropertyFavorite = ({
    propertyUUId,
    currentUser,
}: IusePropertyFavorite) => {

    
    // console.log('Line 25 usePropertyFavorite listingId', propertyUUId)
    async function updateSession(session: any, list: any, propertyUUId: string){
        
        console.log('Hit Updated Session')
        console.log('list: ', list)
        console.log('propertyUUId: ', propertyUUId)
        console.log('What it looks like all together? ', list+','+propertyUUId+',')

        const newlist = session?.user?.favoriteBapUuids;

        let concating

        concating = newlist+propertyUUId+','

        //   if(list !== ''){
        //     console.log('List Not Null')
        //     concating = newlist+propertyUUId+','
        //   }else{
        //     console.log('List Found Null')
        //     concating = newlist+propertyUUId+','
        //   }
            

        console.log('concating', concating)

        // if(session){
        //      //session.user.favoriteBapUuids=list+','+propertyUUId+','
        //      session.user.favoriteBapUuids=concating
        // }

        await update({
            ...session,
            user: {
                ...session?.user,
                favoriteBapUuids: concating
            }
        })

    }

    const { data: session, update } = useSession()

    console.log('session', session?.user)







    const router = useRouter()
    const loginModal =  useLoginModal()

    const reuseUserId = currentUser?.id

    const hasFavorited = useMemo(() => {

        const list = session?.user?.favoriteBapUuids || '';

        console.log('log list', list)
        // console.log('log list propertyUUId', propertyUUId)
        // console.log('list.includes(propertyUUId)', list.includes(propertyUUId))
        
        //return (list as Array<string | number>).some(id => id === propertyUUId);
        

        return list.includes(propertyUUId);
        
    }, [propertyUUId, session?.user?.favoriteBapUuids]);
    
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
                
                //updateSession(session, currentUser?.favoriteBapUuids, propertyUUId)

                request = () => axios.delete(`/api/favorites/bapfavorites/${propertyUUId}`)
                console.log('hasFavorited', request)

            }else{
               
                
                
                request = () => axios.post(`/api/favorites/bapfavorites/${propertyUUId}`)

                updateSession(session, currentUser?.favoriteBapUuids, propertyUUId)

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