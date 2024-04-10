import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'

import BapListings from '@/Components/Listings/BapListings'

import getCurrentUser from '@/Actions/getCurrentUser'


//import MyPropertyClient from './MyPropertyClient'
import MyPropertyClient from '@/app/(main)/myproperties/MyPropertyClient'
import { callPropertysbyUser } from '@/ServiceCalls/callPropertys'

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

    const userProperties = await callPropertysbyUser(parseInt(userId as string));

    //  console.log('Line 36 userProperties', userProperties)
    
    //console.log('responseData: ', JSON.stringify(userReservations));

    if(userProperties.length === 0){
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
      <div>
          <ClientOnly>
                  <MyPropertyClient
                      userProperties={userProperties as any}
                      currentUser={currentUser as any}
                  />
          </ClientOnly>
      </div>
  )
}

export default MyPropertiesPage