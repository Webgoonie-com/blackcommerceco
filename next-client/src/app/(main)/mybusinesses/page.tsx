import React from 'react'
import EmptyState from '@/Components/EmptyStates/EmptyState'
import ClientOnly from '@/Components/ClientOnly'
import getCurrentUser from '@/Actions/getCurrentUser'


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

    return(
      <>
      <ClientOnly>
          <EmptyState 
              title='Your Businessess Page!'
              subtitle='Looks like you you found a section I have not finished yet...'
          />
      </ClientOnly>
      </>
    )

    return (
      <div>MyBusinessPage</div>
    )
}

export default MyBusinessPage