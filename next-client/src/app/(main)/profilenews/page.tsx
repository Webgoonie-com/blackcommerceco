import React from 'react'
import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'
import getCurrentUser from '@/Actions/getCurrentUser'
import ProfileNewsClient from './MyProfileNewsClient'


const ProfileNews = async () => {

    const currentUser = await getCurrentUser()

    const userId = currentUser?.id;
  
    if(!currentUser)
    {
        return (

            <ClientOnly>
                <EmptyState 
                    title='Unauthroized'
                    subtitle='Please Try Loggin In'
                />
            </ClientOnly>

        )
    }

    return (
      
        <ProfileNewsClient />
      
    )

    
}

export default ProfileNews