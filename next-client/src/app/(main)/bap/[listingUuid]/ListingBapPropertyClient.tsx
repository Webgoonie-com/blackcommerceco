"use client"

import { currentUser, Reservation, SafeListing, SafeUser } from "@/Types";
import React, { useMemo } from "react";
import Image from 'next/image';
import { categories } from "@/Components/navbar/navcategories/CategoriesProperties";
import ListingBapHead from "@/Components/Listings/ListingBapHead";

interface ListingBapPropertyClientProps {
    reservations?: Reservation[];
    propertylistingByUuid: SafeListing & {
        user: SafeListing & {
            user: SafeUser
        }
    };
    currentUser: SafeUser | null;
}
const ListingBapPropertyClient: React.FC<ListingBapPropertyClientProps> = ({
    propertylistingByUuid,
    //reservations,
    currentUser
}) => {

    console.log("ListingBapPropertyClient: propertylistingByUuid ", propertylistingByUuid)
    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === propertylistingByUuid.category as any);
    }, [propertylistingByUuid.category]);

    //console.log('Listing from line 26: ListingPropertyClient: ', listing)
    
    return ( 

        <div className="max-w-screen-lg mx-auto">
            
            <div className="flex flex-col gap-6">
            
                Bap Listing Client

                <ListingBapHead 
                    title={propertylistingByUuid?.title}
                    imageSrc={propertylistingByUuid?.imageSrc}
                    locationValue={propertylistingByUuid?.locationValue as any}
                    Id={propertylistingByUuid?.Id}
                    currentUser={currentUser as any}
                />

                Well?
            
            </div>

        </div>
    );
}
 
export default ListingBapPropertyClient;