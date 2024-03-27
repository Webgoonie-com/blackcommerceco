

import getCurrentUser from '@/Actions/getCurrentUser';
import { getPropertyListingByUuId } from '@/Actions/getListingById';
import React from 'react'
import ClientOnly from '@/Components/ClientOnly';
import EmptyStateBap from '@/Components/EmptyStates/EmptyStateBap';

import ListingBapPropertyClient from './ListingBapPropertyClient';

interface IParams {
  listingUuid?: string;

}

const BapsListingPage = async ({ params }: {params: IParams }) => {

  const {listingUuid } = params

  const stringUrlUuid = params

  console.log('stringUrlUuid', stringUrlUuid)

  console.log('Line 21 Page Bap params', params)

  console.log('Line 23 Page Bap listingUuid', listingUuid)



  const propertylistingByUuid = await getPropertyListingByUuId(params)

  const currentUser = await getCurrentUser()
  //console.log('currentUser on line 20 on BapPage.tsx ', currentUser)

  console.log('Line 35 page.tsx bap = propertylistingByUuid', propertylistingByUuid)


  
  if(!propertylistingByUuid){
    return(
    <ClientOnly>
        <EmptyStateBap />
    </ClientOnly>
    )
  }

  return(
    
        <ListingBapPropertyClient
            propertylistingByUuid={propertylistingByUuid}
            currentUser={currentUser as any }
        />
    
    )
}

export default BapsListingPage