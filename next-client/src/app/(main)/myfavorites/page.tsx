import React from 'react'

import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import MyFavoriteClient from './MyFavoriteClient'

import getCurrentUser from '@/Actions/getCurrentUser'
import { callUserReservations } from '@/ServiceCalls/callReservations'


const MyFavoritesClient = async () => {


    const currentUser = await getCurrentUser()

    const userId = currentUser?.id;

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
                    title='No Favorites Found!'
                    subtitle='Looks like you havent made any reservations yet...'
                />
            </ClientOnly>
            </>
        )
    }

    return (
        <ClientOnly>
                <MyFavoriteClient
                    reservations={userReservations as any}
                    currentUser={currentUser as any}
                />
            </ClientOnly>
    )
}

export default MyFavoritesClient