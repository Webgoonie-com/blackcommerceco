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
import EmptyStateBb from '../EmptyStates/EmptyStateBb';
import { currentUser } from '@/Types';



interface BbListingProp {
    Id: number;
    uuid: string;
    currentUser: currentUser
}
interface BapListingProp {
    Id: number;
    uuid: string;
    currentUser: currentUser
}

export default function Listings() {

    const [baplistings, setBapListings] = useState<BapListingProp[]>([]);
    const [bblistings, setBbListings] = useState<BbListingProp[]>([]);
    const [loading, setLoading] = useState(true);



    const { data: session, status } = useSession();
    //const currentUser = session?.user;
    const currentUser = getCurrentUser();

    console.log('Line 41 currentUser', currentUser)
    
    useEffect(() => {
        const fetchData = async () => {
            
            const propertyData = await getPropertyListings();
            
            const businessData = await getBusinessListings();
            
            //const propertyData = await getListings();
            
            // console.log('data from Listings propertyData', propertyData)
            // console.log('data from Listings businessData', businessData)

            

            setBapListings(propertyData);
            setBbListings(businessData);
            setLoading(false);
        };
    
        fetchData();
    }, []);


    const bapsLength = baplistings.length
    const bbsLength = bblistings.length
    
    //console.log('Line 43 on Listings.tsx: ', listings[0])


    //console.log('listing info', JSON.stringify(listings, null, 2));

    if (loading) {
        return null;
    }
   

    

    return (
       <>
            {/* <ClientOnly> */}
                
                {bapsLength === 0 ? (
                    <div className='text-white pt-28 bg-gray-950'>
                    <EmptyStateBap showReset />
                    </div>
                ): (
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
                                {baplistings.map((baplisting: any) => (
                                    <ListingBapCard
                                        key={baplisting.uuid}
                                        currentUser={currentUser as any}
                                        data={baplisting}
                                    />
                                ))}
                                
                            </div>
                        </div>
                    
                </div>
                )}
                
    
    
                {bbsLength === 0 ? (
                    
                    <div className='text-white pt-28 bg-gray-950'>
                        <EmptyStateBb showReset />
                    </div>
                ) : (
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
                                        currentUser={currentUser as any}
                                        data={bblisting}
                                    />
                                ))}
                                
                            </div>
                        </div>
                    
                    </div>
                )}
                
    
                
            {/* </ClientOnly> */}
       </>
        
    )
}

