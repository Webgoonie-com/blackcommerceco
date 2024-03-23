import React from 'react'
// import getCurrentUser from '../../../actions/getCurrentUser';
// import getListingById from '../../../actions/getListingById'
// import ClientOnly from '../../../components/ClientOnly';
// import EmptyState from '../../../components/EmptyState';

// import ListingBapClient from './ListingBapClient';
// import ListingBapPropertyClient from './ListingBapPropertyClient';

import getCurrentUser from '@/Actions/getCurrentUser';
import { getBusinessListingByUuId } from '@/Actions/getListingById';

import Image from 'next/image';

interface IParams {
  listingUuid?: string;

}

const BbsListingPage = async ({ params }: {params: IParams }) => {

    const {listingUuid } = params

    const stringUrlUuid = params

    console.log('26 listingUuid', listingUuid)

    console.log('28 stringUrlUuid', stringUrlUuid)

    console.log('30  Page Bap params', params)


  const BusinessListing = await getBusinessListingByUuId(params)

  const currentUser = await getCurrentUser()
  //console.log('currentUser on line 20 on BapPage.tsx ', currentUser)

  console.log('Line 38 = BusinessListing', BusinessListing)

    return (
      <div className=''>
        Black Business Listing Details Page Viewing

        <h2>{BusinessListing.category} </h2>

        <h2>{BusinessListing.imageSrc} </h2>

        <div className='w-50'>
              <Image
                  fill
                  alt="Business Listing"
                  src={`${BusinessListing?.imageSrc}`}
                  className="
                      object-cover 
                      h-full 
                      w-full 
                      group-hover:scale-110 
                      transition
                      "
                      placeholder = 'empty'
                      priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // has "fill" but is missing "sizes" prop. Please add it to improve page performance.
              />
      </div>

      </div>
    )
}

export default BbsListingPage