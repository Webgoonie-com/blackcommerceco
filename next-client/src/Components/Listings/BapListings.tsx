'use client'

import qs from "query-string";
import React, { useEffect, useState } from 'react';
import { queryPropertyListings } from '@/ServiceCalls/callListings';
import ClientOnly from '@/Components/ClientOnly';
import EmptyStateBap from '@/Components/EmptyStates/EmptyStateBap';
import ListingBapCard from './ListingBapCard';
import { useSearchParams } from "next/navigation";

interface BapListingProp {
    id: number;
    uuid: string;
    Propertys: {
        namePublicDisplay: string;
    
    };
    currentUser: any;
}

const BapListings: React.FC<BapListingProp> = ({
    id,
    uuid,
    Propertys,
    currentUser,
}) => {

    const params = useSearchParams()

    const urlQueryParams = qs.parse(params.toString())

    console.log('urlQueryParams', urlQueryParams)

    
    
    // console.log('Line 25 = currentUser: ', currentUser)

    const [propertyListings, setPropertyListings] = useState<BapListingProp[]>([]);


    

    useEffect(() => {

        const fetchData = async () => {

            const data = await queryPropertyListings(urlQueryParams);

            console.log('return data from queryPropertyListings: ', data)

            setPropertyListings(data);
        };
    
        fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser?.id, urlQueryParams?.locationValue, urlQueryParams?.category]);


    if(propertyListings.length === 0){
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
            
            {/* <div className="relative flex flex-row ms-5 p-5">
                    {Propertys.namePublicDisplay}
            </div> */}

            <div 
                className='relative bg-gray-950 pb-20 pt-28 px-5 py-20 mx-auto flex items-center md:flex-row flex-col'>
                
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
                            {propertyListings.map((listing: any) => (
                                <ListingBapCard
                                    key={listing.uuid}
                                    currentUser={currentUser}
                                    data={listing}
                                />
                            ))}
                            
                        </div>
                    </div>
                
            </div>
        </ClientOnly>
        
    )
}

export default BapListings