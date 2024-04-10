"use client"

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/Components/Container";
import Heading from "@/Components/Heading";

import { currentUser, FavoriteBusinesses, Favorites, SafeReservation, SafeUser } from "@/Types";
import axios from "axios";
import toast from "react-hot-toast";
import ListingBusinessFavoriteCard from "@/Components/Listings/ListingBusinessFavoriteCard";



interface MyFavoritePropertyClientProps {
    userFavorites?: FavoriteBusinesses[] |  undefined;
    currentUser: SafeUser | null;
}

const MyFavoriteProopertyClient: React.FC<MyFavoritePropertyClientProps> = ({
    userFavorites,
    currentUser
}) => {


    //  console.log('userFavorites Props: ', userFavorites)

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
                    title="Your Business Favorites"
                    subtitle="Here is some of the businesses you favorited..."
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
                    {userFavorites && userFavorites.map((favoriteItem, i) => (
                        
                        
                        <ListingBusinessFavoriteCard 
                            key={favoriteItem?.id as any}
                            imageSrc={favoriteItem?.business as any}
                            data={favoriteItem?.business as any}
                            reservation={favoriteItem as any}
                            //TotalPrice={parseFloat(favoriteItem?.totalPrice.toFixed(2))}
                            //startDate={favoriteItem?.startDate as any}
                            //endDate={favoriteItem?.endDate as any}
                            actionId={favoriteItem.id as any}
                            //onAction={onCancel}
                            disabled={deletingId === favoriteItem.id as any}
                            actionLabel="UnFavorite"
                            currentUser={currentUser as any}
                        />
                    ))}
                 </div>
    
            </Container> 
      </div>
        
    );
}
 
export default MyFavoriteProopertyClient;