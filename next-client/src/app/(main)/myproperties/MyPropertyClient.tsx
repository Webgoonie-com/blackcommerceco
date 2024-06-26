"use client"

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/Components/Container";
import Heading from "@/Components/Heading";

import { currentUser, FavoriteBusinesses, FavoritePropertys, Favorites, SafeReservation, SafeUser } from "@/Types";
import axios from "axios";
import toast from "react-hot-toast";
import ListingBusinessFavoriteCard from "@/Components/Listings/ListingBusinessFavoriteCard";
import ListingPropertyFavoriteCard from "@/Components/Listings/ListingPropertyFavoriteCard";



interface MyFavoritePropertyClientProps {
    userProperties?: FavoritePropertys[] |  undefined;
    currentUser: SafeUser | null;
}

const MyPropertyClient: React.FC<MyFavoritePropertyClientProps> = ({
    userProperties,
    currentUser
}) => {


    //  console.log('userProperties Props: ', userProperties)

    const router = useRouter();

    const [deletingId, setDeletingId] = useState('')

    // const onCancel = useCallback(( id: string) => {

    //     setDeletingId(id)

        
    //     //  console.log('deletingId', id)


    //     axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/cancelUserReservation/${id}`)
    //     .then(() =>{
    //         toast.success('Reservation Cancelled successfully')
    //         router.refresh()
    //     })
    //     .catch((error) => {
            
    //         toast.error(error?.response?.data?.error)

    //     })
    //     .finally(() => {
    //         setDeletingId('')
    //     })

    // }, [router])
    

    
    
    return ( 
      <div className="bg-gray-950">
            <Container>
                <Heading
                    title="Your Properties Listed Online"
                    subtitle="These are the properties that belong to you..."
                 />
                 <div className="
                        mt-10 grid grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        2xl:grid-cols-6
                        gap-8
                        bg-gray-950
                    "
                 >
                    {userProperties && userProperties.map((userPropertiesiteItem, i) => (
                        
                        
                        <ListingPropertyFavoriteCard 
                            key={userPropertiesiteItem?.id as any}
                            imageSrc={userPropertiesiteItem?.imageSrc as any}
                            data={userPropertiesiteItem as any}


                            actionId={userPropertiesiteItem.id as any}
                            //onAction={onCancel}
                            disabled={deletingId === userPropertiesiteItem.id as any}
                            actionLabel="UnFavorite"
                            currentUser={currentUser as any}
                        />
                    ))}
                 </div>
    
            </Container> 
      </div>
        
    );
}
 
export default MyPropertyClient;