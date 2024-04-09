"use client"

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/Components/Container";
import Heading from "@/Components/Heading";

import { currentUser, SafeReservation, SafeUser } from "@/Types";
import axios from "axios";
import toast from "react-hot-toast";
import ListingTripCard from "@/Components/Listings/ListingTripCard";


interface TripsclientProps {
    reservations?: SafeReservation[] |  undefined;
    currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsclientProps> = ({
    reservations,
    currentUser
}) => {


    //console.log('reservations', reservations)

    const router = useRouter();

    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(( id: string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(() =>{
            toast.success('Reservation Cancelled successfully')
            router.refresh()
        })
        .catch((error) => {
            
            toast.error(error?.response?.data?.error)

        })
        .finally(() => {
            setDeletingId('')
        })

    }, [router])
    

    
    
    return ( 
      <div className="bg-gray-950">
            <Container>
                <Heading
                    title="Trips"
                    subtitle="Where you've been and where you're going"
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
                    {reservations && reservations.map((reservationItem, i) => (
                        
                        
                        <ListingTripCard 
                            key={reservationItem?.id as any}
                            imageSrc={reservationItem?.property?.imageSrc as any}
                            data={reservationItem?.property as any}
                            reservation={reservationItem as any}
                            startDate={reservationItem?.startDate as any}
                            endDate={reservationItem?.endDate as any}
                            actionId={reservationItem.id as any}
                            onAction={onCancel}
                            disabled={deletingId === reservationItem.id as any}
                            actionLabel="Cancel Reservation"
                            currentUser={currentUser as any}
                        />
                    ))}
                 </div>
    
            </Container> 
      </div>
        
    );
}
 
export default TripsClient;