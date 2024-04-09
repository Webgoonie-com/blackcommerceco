
import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import TripsClient from './TripsClient'

import getCurrentUser from '@/Actions/getCurrentUser'





import React from 'react'
import { callUserReservations } from '@/ServiceCalls/callReservations'

const TripsPage = async () => {
    

    const currentUser = await getCurrentUser()

    const userId = currentUser?.id;

    
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

  

    const userReservations = await callUserReservations(userId);
    
    //console.log('responseData: ', JSON.stringify(userReservations));

    if(userReservations.length === 0){
        return(
            <>
            <ClientOnly>
                <EmptyState 
                    title='No trips found'
                    subtitle='Looks like you havent reserved any trips'
                />
            </ClientOnly>
            </>
        )
    }

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