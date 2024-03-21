'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import getListings from '@/ServiceCalls/callListings';
import ClientOnly from '@/Components/ClientOnly';
import EmptyState from '@/Components/EmptyState';
import ListingCard from '@/Components/Listings/ListingCard';
import getCurrentUser from '@/Actions/getCurrentUser';
import Container from '../Container';


interface Listing {
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

    const [listings, setListings] = useState<Listing[]>([]);


    const { data: session, status } = useSession();
    //const currentUser = session?.user;
    const currentUser = getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getListings();
            console.log('data from Listings', data)
            setListings(data);
        };
    
        fetchData();
    }, []);


    
    
    //console.log('Line 43 on Listings.tsx: ', listings[0])


    //console.log('listing info', JSON.stringify(listings, null, 2));


    if(listings.length === 0){
        return(
            <ClientOnly>
                <div className='text-white pt-28 bg-gray-950'>
                    <EmptyState showReset />
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
                <Container>
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
                            {listings.map((listing: any) => (
                                <ListingCard 
                                    key={listing.uuid}
                                    currentUser={listing.currentUser}
                                    data={listing}
                                />
                            ))}
                            
                        </div>
                    </div>
                </Container>
            </div>
        </ClientOnly>
        
    )
}

