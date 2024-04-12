import React from 'react'
import BapListings from '@/Components/Listings/BapListings'

import getCurrentUser from "@/Actions/getCurrentUser";
import { PropertyCategories } from '@/Components/Categories/PropertyCategories';

const Baps = async () => {

  const currentUser = await getCurrentUser();

  return (
    <div id="content-wrap" className="h-full bg-gray-950 text-white ps-4">
      
      
        <div className="relative">

          <BapListings 
            id={currentUser?.id as any}
            currentUser={currentUser as any}
            uuid={currentUser?.uuid as any} 
            Propertys={{
              namePublicDisplay: 'Black Properties'
            }}
          />

          <div className="w-full relative">
            <PropertyCategories />
          </div>

        </div>

    </div>
  )
}

export default Baps