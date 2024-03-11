

import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

import React from 'react'


export async function getSession(){
    return await getServerSession(authOptions)
}

export default async function getCurrentUsers(){
    try {
        
        const session = await getSession()

        // console.log('authOptions session', session)

        if(!session?.user?.email){
            return null;
        }

        const currentUser = session.user

        //console.log("Line 27 = currentUser", currentUser, "session.user", session.user);

        if(!currentUser){
            //console.log("Line 32 = !currentUserDetected")
            return null
        }

        return {
            ...currentUser,
            ...session,
            }

    } catch (error: any) {
        console.log('Line 37: Error', error)
        return null
    }
}

