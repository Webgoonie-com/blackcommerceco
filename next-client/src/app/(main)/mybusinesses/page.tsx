import React from 'react'
import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'
import getCurrentUser from '@/Actions/getCurrentUser'
import { callBusinessbyUser } from '@/ServiceCalls/callBusinesses'
import MyBusinessClient from './MyBusinessClient'


const MyBusinessPage = async () => {

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


    const userBusinesses = await callBusinessbyUser(parseInt(userId as string));

    console.log('Lione 36 userBusinesses', userBusinesses)

    if(userBusinesses.length === 0){
        return(
            <>
            <ClientOnly>
                <EmptyState 
                    title='No Businesses Found!'
                    subtitle='Looks like you havent listed any of your Businesses yet...'
                />
            </ClientOnly>
            </>
        )
    }


    return (
        <div>
            <ClientOnly>
                    <MyBusinessClient
                        userFavorites={userBusinesses as any}
                        currentUser={currentUser as any}
                    />
            </ClientOnly>
        </div>
    )
}

export default MyBusinessPage