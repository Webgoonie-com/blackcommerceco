import React from 'react'

import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import MyFavoriteClient from './MyFavoriteClient'

import getCurrentUser from '@/Actions/getCurrentUser'
import { callUserReservations } from '@/ServiceCalls/callReservations'
import { callUserPropertyFavorites } from '@/ServiceCalls/callFavorites'


const MyFavoritesClient = async () => {


    const currentUser = await getCurrentUser()

    const userId = currentUser?.id as string;

    const userUuId =  currentUser?.uuid as string;

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

    const userFavorites = await callUserPropertyFavorites(parseInt(userId));
    
    //console.log('responseData: ', JSON.stringify(userReservations));

    if(userFavorites.length === 0){
        return(
            <>
            <ClientOnly>
                <EmptyState 
                    title='None Of Your Favorites Were Found!'
                    subtitle='Looks like you havent made any favorites yet...'
                />
            </ClientOnly>
            </>
        )
    }

    return (
        <>
        
            {/* {console.log('JSON.stringify userFavorites', JSON.stringify(userFavorites))} */}

            <ClientOnly>
                    <MyFavoriteClient
                        userFavorites={userFavorites as any}
                        currentUser={currentUser as any}
                    />
            </ClientOnly>

        </>
    )
}

export default MyFavoritesClient