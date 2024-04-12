import React from 'react'
import BbListings from '@/Components/Listings/BbListings'
import getCurrentUser from "@/Actions/getCurrentUser";
import BusinessCategories from '@/Components/Categories/BusinessCategories';

const BbsPage = async () => {

      
    const currentUser = await getCurrentUser();

    return (

          
      <div id="content-wrap" className="h-full bg-gray-950 text-white ps-4">
        
        <div className='relative'>
            
            
            <BbListings
              id={currentUser?.id as any}
              currentUser={currentUser as any}
              uuid={currentUser?.uuid as any} 
              Businesses={{
                namePublicDisplay: 'Black Businesses'
              }}
            />

            <div className="w-full relative">
              <BusinessCategories />
            </div>

        </div>
        
      </div>
    )
}

export default BbsPage