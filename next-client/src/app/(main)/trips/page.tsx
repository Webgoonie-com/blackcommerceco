import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import TripsClient from './TripsClient'

import getCurrentUser from '@/Actions/getCurrentUser'
import getPropertyReservations from '@/Actions/getPropertyReservations'

import React from 'react'

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

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

    const reservations = await getPropertyReservations({
        userId: currentUser.id,
    })

    if(reservations.length === 0){
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
                    reservations={reservations as any}
                    currentUser={currentUser as any}
                />
            </ClientOnly>
    )
}

export default TripsPage