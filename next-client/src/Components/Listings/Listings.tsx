'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import getListings, { getBusinessListings, getPropertyListings } from '@/ServiceCalls/callListings';
import ClientOnly from '@/Components/ClientOnly';
import EmptyState from '@/Components/EmptyStates/EmptyState';
import ListingCard from '@/Components/Listings/ListingCard';
import getCurrentUser from '@/Actions/getCurrentUser';
import EmptyStateBap from '../EmptyStates/EmptyStateBap';
import ListingBapCard from './ListingBapCard';
import ListingBbCard from './ListingBbCard';



interface BbListingProp {
    Id: number;
    uuid: string;
    // ... other properties
    Businesses: {
        namePublicDisplay: string;
        // ... other properties
    };
    // ... other properties
}
interface BapListingProp {
    Id: number;
    uuid: string;
    // ... other properties
    Businesses: {
        namePublicDisplay: string;
        // ... other properties
    };
    // ... other properties
}

export default function Listings() {

    const [baplistings, setBapListings] = useState<BapListingProp[]>([]);
    const [bblistings, setBbListings] = useState<BbListingProp[]>([]);


    const { data: session, status } = useSession();
    //const currentUser = session?.user;
    const currentUser = getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            
            const propertyData = await getPropertyListings();
            
            const businessData = await getBusinessListings();
            
            //const propertyData = await getListings();
            
            console.log('data from Listings propertyData', propertyData)
            console.log('data from Listings businessData', businessData)

            setBapListings(propertyData);
            setBbListings(businessData);
        };
    
        fetchData();
    }, []);


    
    
    //console.log('Line 43 on Listings.tsx: ', listings[0])


    //console.log('listing info', JSON.stringify(listings, null, 2));


    if(baplistings.length === 0){
        return(
            <ClientOnly>
                <div className='text-white pt-28 bg-gray-950'>
                    <EmptyStateBap showReset />
                </div>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            
            <div 
                className='relative bg-gray-950 pb-20 pt-28 px-5 py-20 mx-auto flex items-center md:flex-row flex-col'
                //className=' px-32 py-20 bg-gray-950 pb-20 pt-28'
            >
                
                    <div className='container text-white'>
                        <div
                            className="
                                pt-24 
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                md:grid-cols-3
                                lg:grid-cols-4
                                xl:grid-cols-5
                                2xl:grid-cols-6
                                gap-8
                            "> 
                            {baplistings.map((listing: any) => (
                                <ListingBapCard
                                    key={listing.uuid}
                                    currentUser={listing.currentUser}
                                    data={listing}
                                />
                            ))}
                            
                        </div>
                    </div>
                
            </div>


            <div 
                className='relative bg-gray-950 pb-20 pt-28 px-5 py-20 mx-auto flex items-center md:flex-row flex-col'
                //className=' px-32 py-20 bg-gray-950 pb-20 pt-28'
            >
                
                    <div className='container text-white'>
                        <div
                            className="
                                pt-24 
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                md:grid-cols-3
                                lg:grid-cols-4
                                xl:grid-cols-5
                                2xl:grid-cols-6
                                gap-8
                            "> 
                            {bblistings.map((bblisting: any) => (
                                <ListingBbCard
                                    key={bblisting.uuid}
                                    currentUser={bblisting.currentUser}
                                    data={bblisting}
                                />
                            ))}
                            
                        </div>
                    </div>
                
            </div>

            
        </ClientOnly>
        
    )
}

