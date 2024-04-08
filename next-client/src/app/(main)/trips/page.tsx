
import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import TripsClient from './TripsClient'

import getCurrentUser from '@/Actions/getCurrentUser'



import { useSession } from'next-auth/react'

import React from 'react'
import { callReservations, callUserReservations } from '@/ServiceCalls/callReservations'

const TripsPage = async () => {
    

    const currentUser = await getCurrentUser()

    const userId = currentUser?.id;

    console.log('Line 23 currentUser', currentUser)
    console.log('Line 24 userId', userId)

    
    // const { data: session, update } = useSession()
    
    // const currentUser =  session?.user

    // console.log('currentUser', currentUser)
    
    if(!currentUser)
    {
        return(
            <>
            <ClientOnly>
                <EmptyState 
                    title='Unauthroized'
                    subtitle='Please Try Loggin In'
                />
            </ClientOnly>
            </>
        )
    }

    // const reservations = await getPropertyReservations({
    //     userId: currentUser.id,
    // })
    
    // const reservations = await callReservations({
    //     userId: currentUser.id,
    // })

    //const reservations = await callReservations(currentUser?.id, currentUser?.id);

    const userReservations = await callUserReservations(userId);
    
    console.log('responseData: ', JSON.stringify(userReservations));

    // if(userReservations.length === 0){
    //     return(
    //         <>
    //         <ClientOnly>
    //             <EmptyState 
    //                 title='No trips found'
    //                 subtitle='Looks like you havent reserved any trips'
    //             />
    //         </ClientOnly>
    //         </>
    //     )
    // }

    return (
        <ClientOnly>
                <TripsClient
                    reservations={userReservations as any}
                    currentUser={currentUser as any}
                />
            </ClientOnly>
    )
}

export default TripsPage