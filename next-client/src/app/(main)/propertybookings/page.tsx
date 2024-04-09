
import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import PropertyBookingClient from './PropertyBookingClient'

import getCurrentUser from '@/Actions/getCurrentUser'





import React from 'react'
import { callUserReservations } from '@/ServiceCalls/callReservations'


const PropertyBookingsPage = async () => {
    

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

  

    const userPropertyBookings = await callUserReservations(userId);
    
    //console.log('responseData: ', JSON.stringify(userPropertyBookings));

    if(userPropertyBookings.length === 0){
        return(
            <div className=''>
                <ClientOnly>
                    <EmptyState 
                        title='No PropertyBookings found!'
                        subtitle='Looks like you havent confirmed any PropertyBookings yet...'
                    />
                </ClientOnly>
            </div>
        )
    }

    return (
        <ClientOnly>
                <PropertyBookingClient
                    propertyBookings={userPropertyBookings as any}
                    currentUser={currentUser as any}
                />
        </ClientOnly>
    )
}

export default PropertyBookingsPage