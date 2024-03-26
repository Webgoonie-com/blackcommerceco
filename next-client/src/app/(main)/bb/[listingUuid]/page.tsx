import React from 'react'

import getCurrentUser from '@/Actions/getCurrentUser';
import { getBusinessListingByUuId } from '@/Actions/getListingById';

import ClientOnly from '@/Components/ClientOnly';
import EmptyStateBap from '@/Components/EmptyStates/EmptyStateBap';
import Image from 'next/image';
import EmptyStateBb from '@/Components/EmptyStates/EmptyStateBb';
import ListingBbBusinessClient from './ListingBbBusinessClient';

interface IParams {
  listingUuid?: string;

}

const BbsListingPage = async ({ params }: {params: IParams }) => {

    const {listingUuid } = params

    const stringUrlUuid = params

    console.log('26 listingUuid', listingUuid)

    console.log('28 stringUrlUuid', stringUrlUuid)

    console.log('30  Page Bap params', params)


  const businessListingByUuid = await getBusinessListingByUuId(params)

  console.log('Line 32 = getBusinessListingByUuId', getBusinessListingByUuId)

  const currentUser = await getCurrentUser()
  //console.log('currentUser on line 20 on BapPage.tsx ', currentUser)

  console.log('Line 38 = BusinessListing', businessListingByUuid)

  if(!businessListingByUuid){
    return(
    <ClientOnly>
        <EmptyStateBb />
    </ClientOnly>
    )
  }

   
  return(
    <ClientOnly>
        <ListingBbBusinessClient
            propertylistingByUuid={businessListingByUuid}
            currentUser={currentUser as any }
        />
    </ClientOnly>
    )
}

export default BbsListingPage