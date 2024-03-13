

import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

import React from 'react'


export async function getSession(){
    return await getServerSession(authOptions)
}

export default async function getCurrentUsers(){
    try {
        
        const session = await getSession()

        //  console.log('authOptions session', session)

        if(session?.user?.name === 'undefined undefined'){
            //console.log('Line 22 3rd party Login session Detected...')
        }

        if(!session?.user?.email){
            return null;
        }

        const currentUser = session.user

        //  console.log("Line 31 = currentUser", currentUser, "session.user", session.user);

        if(!currentUser){
            //console.log("Line 34 = !currentUserDetected")
            return null
        }

        return {
            ...currentUser,
            ...session,
            // createdAt: currentUser.createdAt.toISOString(),
            // updatedAt: currentUser.updatedAt.toISOString(),
            // emailVerified: currentUser?.emailVerified?.toISOString() || null,
            }

    } catch (error: any) {
        console.log('Line 47: Error', error)
        return null
    }
}

