
import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import PendingStayClient from './PendingStayClient'

import getCurrentUser from '@/Actions/getCurrentUser'





import React from 'react'
import { callUserReservations } from '@/ServiceCalls/callReservations'

const PendingStaysPage = async () => {
    

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
                    title='No Pending Reservations Found!'
                    subtitle='Looks like you havent made any reservations yet...'
                />
            </ClientOnly>
            </>
        )
    }

    return (
        <ClientOnly>
                <PendingStayClient
                    reservations={userReservations as any}
                    currentUser={currentUser as any}
                />
            </ClientOnly>
    )
}

export default PendingStaysPage