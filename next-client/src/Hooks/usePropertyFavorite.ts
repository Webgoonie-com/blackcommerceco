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
    

    const { data: session, update } = useSession()




    const router = useRouter()
    const loginModal =  useLoginModal()

    const reuseUserId = currentUser?.id

    
    const hasFavorited = useMemo(() => {

        const list = session?.user?.favoriteBapUuids || '' as string;

        
        return list.includes(propertyUUId);
        
    }, [propertyUUId, session?.user?.favoriteBapUuids]);
    
    
   
    
    // // toggle to write on and off
    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation()

        async function updateAddSession(session: any, propertyUUId: string){
        
            
            
    
            let currentList = session?.user?.favoriteBapUuids; 
    
            let concating
    
            if(currentList && currentList.length > 1){
                concating = currentList+propertyUUId+','
              }else{
                concating = propertyUUId+','
              }
    
            await update({
                ...session,
                user: {
                    ...session?.user,
                    favoriteBapUuids: concating
                }
            })
    
        }
    
        async function updateRemoveSession(session: any, propertyUUId: string){
                
            let currentlist = session?.user?.favoriteBapUuids;
    
            const textToReplace = propertyUUId+','; // we will replace : with div spacer
    
            const newList = currentlist.split(textToReplace).join('');
    
            let concating
    
            concating = newList
            
            await update({
                ...session,
                user: {
                    ...session?.user,
                    favoriteBapUuids: newList
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
                
                updateRemoveSession(session, propertyUUId)

                request = () => {

                    axios.delete(`/api/favorites/bapfavorites/${propertyUUId}`)

                    axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/delPropertyfavorites/${propertyUUId}`, {
                        userId: reuseUserId,
                        propertyUUId: propertyUUId,
                      })

                     
                }
               

            }else{
               
                
                updateAddSession(session, propertyUUId)
                
                request = () => { 
                    
                    axios.post(`/api/favorites/bapfavorites/${propertyUUId}`)

                    axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/addPropertyfavorites/${propertyUUId}`, {
                        userId: currentUser?.id,
                        propertyUUId: propertyUUId,
                      })
                 }

                


               
            }

            await request()

            router.refresh()
            toast.success('Success')

        } catch (error) {
            toast.error('Sorry Something With Terribly Wrong!!!')
        }


        // try {
        //     let request2

        //     if(hasFavorited){
        //         request2 = () => {

        //             axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/delPropertyfavorites/${propertyUUId}`, {
        //                 userId: reuseUserId,
        //                 propertyUUId: propertyUUId,
        //               })

        //         }
        //     }else{
        //         request2 =() => {
                    
        //             axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/listings/addPropertyfavorites/${propertyUUId}`, {
        //                 userId: currentUser?.id,
        //                 propertyUUId: propertyUUId,
        //               })

        //         }
        //     }

        //     await request2();
        //     // router.refresh();
        //     // toast.success('Success');

        // } catch (error) {
        //    // toast.error('Something went wrong on handling your favorite.');
        // }

    }, [currentUser, hasFavorited, loginModal, propertyUUId, reuseUserId, router, session, update])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default usePropertyFavorite