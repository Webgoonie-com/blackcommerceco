import React from 'react'

import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'


import getCurrentUser from '@/Actions/getCurrentUser'
import { callUserReservations } from '@/ServiceCalls/callReservations'
import { callUserBusinessFavorites, callUserPropertyFavorites } from '@/ServiceCalls/callFavorites'

import MyFavoritePropertyClient from './MyFavoritePropertyClient'
import MyFavoriteBusinessClient from './MyFavoriteBusinessClient'


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

    const UserPropertyFavorites = await callUserPropertyFavorites(parseInt(userId));

    const UsereBusinessFavorites = await callUserBusinessFavorites(parseInt(userId));
    
    //console.log('responseData: ', JSON.stringify(userReservations));

    if(UserPropertyFavorites.length === 0){
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
        
            {console.log('JSON.stringify UsereBusinessFavorites', JSON.stringify(UsereBusinessFavorites))}

            { UsereBusinessFavorites.length !== 0 ? (
                <>
                    <ClientOnly>
                            <MyFavoritePropertyClient
                                userFavorites={UsereBusinessFavorites as any}
                                currentUser={currentUser as any}
                            />
                    </ClientOnly>
                </>
            ) : (
                null
            )}

            { UserPropertyFavorites.length !== 0 ? (
                <>
                    <ClientOnly>
                            <MyFavoriteBusinessClient
                                userFavorites={UserPropertyFavorites as any}
                                currentUser={currentUser as any}
                            />
                    </ClientOnly>
                </>
            ) : (
                null
            )}

        </>
    )
}

export default MyFavoritesClient