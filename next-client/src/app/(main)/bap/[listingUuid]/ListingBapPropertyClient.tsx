import { currentUser, Reservation, SafeListing, SafeUser } from "@/Types";
import React, { useMemo } from "react";
import Image from 'next/image';
import { categories } from "@/Components/navbar/navcategories/CategoriesProperties";

interface ListingBapPropertyClientProps {
    reservations?: Reservation[];
    propertylistingByUuid: SafeListing & {
        user: SafeListing & {
            user: SafeUser
        }
    };
    currentUser: currentUser | null;
}
const ListingBapPropertyClient: React.FC<ListingBapPropertyClientProps> = ({
    propertylistingByUuid,
    //reservations,
    currentUser
}) => {

    // const category = useMemo(() => {
    //     return categories.find((item) => 
    //     item.label === propertylistingByUuid?.category);
    // }, [propertylistingByUuid?.category]);

    //console.log('Listing from line 26: ListingPropertyClient: ', listing)
    
    return ( 

        <div>
            
            Bap Listing Client

        </div>
    );
}
 
export default ListingBapPropertyClient;