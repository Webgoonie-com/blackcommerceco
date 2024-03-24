

import getCurrentUser from '@/Actions/getCurrentUser';
import getListingByUuId, { getPropertyListingByUuId } from '@/Actions/getListingById';
import React from 'react'
import Image from 'next/image';
import ClientOnly from '@/Components/ClientOnly';
import EmptyStateBap from '@/Components/EmptyStates/EmptyStateBap';

interface IParams {
  listingUuid?: string;

}

const BapsListingPage = async ({ params }: {params: IParams }) => {

  const {listingUuid } = params

  const stringUrlUuid = params

  console.log('stringUrlUuid', stringUrlUuid)

  console.log('Line 21 Page Bap params', params)

  console.log('Line 23 Page Bap listingUuid', listingUuid)


  const Propertylisting = await getPropertyListingByUuId(params)

  const currentUser = await getCurrentUser()
  //console.log('currentUser on line 20 on BapPage.tsx ', currentUser)

  console.log('Line 12 = Propertylisting', Propertylisting)


  
  if(!Propertylisting){
    return(
    <ClientOnly>
        <EmptyStateBap />
    </ClientOnly>
    )
  }

  return (
    <div className='relative'>
      

      <h2>Black Air Property Details Page View </h2>
      
      <h2>{Propertylisting.category} </h2>

      <h2>{Propertylisting.imageSrc} </h2>
      <div className='w-50'>
              <Image
                  //fill
                  alt="Business Listing"
                  src={`${Propertylisting?.imageSrc}`}
                  width={100}
                  height={100}
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

export default BapsListingPage