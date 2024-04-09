import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import BapListings from '@/Components/Listings/BapListings'

import getCurrentUser from '@/Actions/getCurrentUser'

import { callUserReservations } from '@/ServiceCalls/callReservations'
//import MyPropertyClient from './MyPropertyClient'
import MyPropertyClient from '@/app/(main)/myproperties/MyPropertyClient'

const MyPropertiesPage = async () => {
  
  
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
                    title='No Properties Found!'
                    subtitle='Looks like you havent listed any of your properties yet...'
                />
            </ClientOnly>
            </>
        )
    }


    return (
      <ClientOnly>
              <MyPropertyClient
                  reservations={userReservations as any}
                  currentUser={currentUser as any}
              />
      </ClientOnly>
  )
}

export default MyPropertiesPage