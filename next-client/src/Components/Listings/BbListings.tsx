'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { getBusinessListings } from '@/ServiceCalls/callListings';
import ClientOnly from '@/Components/ClientOnly';
import EmptyStateBb from '@/Components/EmptyStates/EmptyStateBb';
import ListingBbCard from './ListingBbCard';



interface BbListingProp {
    id: number;
    uuid: string;
    
    Businesses: {
        namePublicDisplay: string;
    
    };
    currentUser: any,
}

const BbListings: React.FC<BbListingProp> = ({
    id,
    uuid,
    currentUser,
}) => {

    const [bBlistings, setBbListings] = useState<BbListingProp[]>([]);


    
    useEffect(() => {
        
        const fetchData = async () => {
            
            const data = await getBusinessListings()
            
            setBbListings(data)
        };
    
        fetchData()

    }, []);


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
                className="
                            relative bg-gray-950 
                            pb-20 pt-28 px-5 py-20 mx-auto 
                            flex items-center md:flex-row flex-col
            ">
                
                    <div className='container text-white' id={uuid}>
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
                                    currentUser={currentUser as any}
                                    data={listing}
                                />
                            ))}
                            
                        </div>
                    </div>
                
            </div>
        </ClientOnly>
        
    )
}

export default BbListings