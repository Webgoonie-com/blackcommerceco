"use client"

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/Components/Container";
import Heading from "@/Components/Heading";

import { currentUser, SafeReservation, SafeUser } from "@/Types";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/Components/Listings/ListingCard";


interface TripsclientProps {
    reservations?: SafeReservation[] |  undefined;
    currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsclientProps> = ({
    reservations,
    currentUser
}) => {


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
    

    console.log('reservations', reservations)
    
    return ( 
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
                "
             >
                {reservations && reservations.map((reservation) => (
                    <ListingCard 
                        key={reservation.id}
                        data={reservation?.listing as any}
                        reservation={reservation as any}
                        actionId={reservation.id as any}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id as any}
                        actionLabel="Cancel Reservation"
                        currentUser={currentUser as any}
                    />
                ))}
             </div>

        </Container> 
        
    );
}
 
export default TripsClient;