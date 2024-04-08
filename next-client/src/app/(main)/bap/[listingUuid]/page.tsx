

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


  const propertylistingByUuid = await getPropertyListingByUuId(params)



  const currentUser = await getCurrentUser()
  

  


  
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