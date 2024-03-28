import React from 'react'
import BapListings from '@/Components/Listings/BapListings'

import getCurrentUser from "@/Actions/getCurrentUser";

const Baps = async () => {

  const currentUser = await getCurrentUser();

  return (
    <div className='bg-gray-950 h-screen text-white px-10 pb-20'>
      
      
      <BapListings 
        id={currentUser?.id as any}
        currentUser={currentUser as any}
        uuid={currentUser?.uuid as any} 
        />

    </div>
  )
}

export default Baps