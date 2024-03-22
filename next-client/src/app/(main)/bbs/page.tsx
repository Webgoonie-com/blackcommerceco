import BbListings from '@/Components/Listings/BbListings'
import React from 'react'

const BbsPage = () => {
  return (
    <div id="content-wrap" className="h-full bg-gray-950 text-white ps-4">
       
       <div className=''>
          <h2>Black Businesses Page</h2>
  
          <p>Full List Of BbListings Black Businesses Listings Page</p>
          <BbListings />
       </div>
       
    </div>
  )
}

export default BbsPage