'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { getBusinessListings } from '@/ServiceCalls/callListings';
import ClientOnly from '@/Components/ClientOnly';
import EmptyStateBb from '@/Components/EmptyStates/EmptyStateBb';
import getCurrentUser from '@/Actions/getCurrentUser';
import ListingBbCard from './ListingBbCard';



interface BbListing {
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

    const [bBlistings, setBbListings] = useState<BbListing[]>([]);


    const { data: session, status } = useSession();
    //const currentUser = session?.user;
    const currentUser = getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBusinessListings();
            console.log('data from Buiness Listings', data)
            setBbListings(data);
        };
    
        fetchData();
    }, []);


    
    
    //console.log('Line 43 on Listings.tsx: ', listings[0])


    //console.log('listing info', JSON.stringify(listings, null, 2));


    if(bBlistings.length === 0){
        return(
            <ClientOnly>
                <div className='text-white pt-28 bg-gray-950'>
                    <EmptyStateBb showReset />
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
                            {bBlistings.map((listing: any) => (
                                <ListingBbCard 
                                    key={listing.uuid}
                                    currentUser={listing.currentUser}
                                    data={listing}
                                />
                            ))}
                            
                        </div>
                    </div>
                
            </div>
        </ClientOnly>
        
    )
}

