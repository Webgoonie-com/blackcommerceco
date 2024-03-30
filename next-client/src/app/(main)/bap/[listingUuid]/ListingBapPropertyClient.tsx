"use client"

import { Listing, Reservation, User } from "@/Types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CategoriesOnlyProperties } from '@/Components/Categories/CategoriesOnly';
import ListingBapHead from "@/Components/Listings/ListingBapHead";
import ListingBapPropertyInfo from "@/Components/Listings/ListingBapPropertyInfo";
import useLoginModal from "@/Hooks/useLoginModal";
import { useRouter } from 'next/navigation';
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingBapPropertyReservation from "@/Components/Listings/ListingBapPropertyReservation";
import { Range } from "react-date-range"


const initialDateRange: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingBapPropertyClientProps {
    reservations?: Reservation[];
    propertylistingByUuid: Listing & {
        user: Listing & {
            user: User
        }
    };
    currentUser: User | null;
}

const ListingBapPropertyClient: React.FC<ListingBapPropertyClientProps> = ({
    propertylistingByUuid,
    reservations = [],
    currentUser
}) => {

    

    const loginModal = useLoginModal()

    const router = useRouter()

    const disabledDates = useMemo(() => {
        
        let dates: Date[] = []

        reservations.forEach((reservation: any) => {
            
            const dateObj = {
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            }

            const range = eachDayOfInterval(dateObj)

            dates = [...dates, ...range]

        })

        return dates

    }, [reservations])


    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(parseFloat(propertylistingByUuid?.price))
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen()
        }

        setIsLoading(true)

        axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/propertys/reservations/create', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: propertylistingByUuid?.id,
            propertyUuid: propertylistingByUuid?.uuid,
            userId: currentUser.id
        })
        .then(() => {

            toast.success('Your Reservation Has Just Been Reserved!', {
                duration: 7000,
                position: 'bottom-right',
            })

            setDateRange(initialDateRange)

            // Redirect to /trips
            router.refresh()
        })
        .catch(() => {
            toast.error('something went wrong making your reservation just now')
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [currentUser, totalPrice, dateRange.startDate, dateRange.endDate, propertylistingByUuid?.id, propertylistingByUuid?.uuid, loginModal, router])


    const category = useMemo(() => {
        return CategoriesOnlyProperties.find((item) => 
        item.label === propertylistingByUuid.category as any);
    }, [propertylistingByUuid.category]);


    // For Everytime There is a change on Reservation Calendar
    useEffect(() => {

        if(dateRange.startDate && dateRange.endDate){
            // It's gonna count how mnay days are selected
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            
            // It's gonna count how many days per night is selected
            if(dayCount && propertylistingByUuid?.price){
                setTotalPrice(dayCount * parseFloat(propertylistingByUuid?.price))
            }else{
                // If no multiple day count
                setTotalPrice(parseFloat(propertylistingByUuid?.price))
            }
        }
    
        
    }, [dateRange, propertylistingByUuid?.price])
    

    
    
    return ( 

        <div className="max-w-screen-lg mx-auto mb-14">
            
            <div className="flex flex-col gap-6">
            
              
            

                <ListingBapHead 
                    title={propertylistingByUuid?.title}
                    imageSrc={propertylistingByUuid?.imageSrc || null}
                    locationValue={propertylistingByUuid?.locationValue as any}
                    country={propertylistingByUuid?.country?.label as any}
                    countryStateRegion={propertylistingByUuid?.countryStateRegion?.name as any}
                    countryCity={propertylistingByUuid?.countryCity?.name as any}
                    id={propertylistingByUuid?.id}
                    currentUser={currentUser as any}
                />

                

               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">

                        <ListingBapPropertyInfo 
                            user={currentUser as any}
                            description={propertylistingByUuid?.description}
                            guestCount={0}
                            roomCount={0}
                            bathroomCount={0}
                            category={category}
                            locationValue={propertylistingByUuid as any}
                            country={propertylistingByUuid?.country?.latlng}
                            countryStateRegion={propertylistingByUuid?.countryStateRegion?.latlng}
                            countryCity={propertylistingByUuid?.countryCity?.latlng}
                        />
                        
                        <div className="order-first mb-10 md:order-last md:col-span-3">

                            <ListingBapPropertyReservation
                                price={parseFloat(propertylistingByUuid?.price)}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />

                        </div>


               </div>

                
            
            </div>

        </div>
    );
}
 
export default ListingBapPropertyClient;