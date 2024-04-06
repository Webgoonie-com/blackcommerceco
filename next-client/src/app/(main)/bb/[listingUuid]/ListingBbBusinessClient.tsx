"use client"

import { BuisinessListing, Reservation, User } from "@/Types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CategoriesOnlyBusinesses } from '@/Components/Categories/CategoriesOnly';
import ListingBbHead from "@/Components/Listings/ListingBbHead";
import ListingBbBusinessInfo from "@/Components/Listings/ListingBbBusinessInfo";
import useLoginModal from "@/Hooks/useLoginModal";
import { useRouter } from 'next/navigation';
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range"
import ListingBbBusinessReservation from "@/Components/Listings/ListingBbBusinessReservation";


const initialDateRange: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingBbBusinessClientProps {
    reservations?: Reservation[];
    businessListingByUuid: BuisinessListing & {
        user: BuisinessListing & {
            user: User
        }
    };
    currentUser: User | null;
}

const ListingBbBusinessClient: React.FC<ListingBbBusinessClientProps> = ({
    businessListingByUuid,
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


    console.log('businessListingByUuid', businessListingByUuid)

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(parseFloat(businessListingByUuid?.sellPrice) || 100.00)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen()
        }

        setIsLoading(true)

        axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/Businesses/reservations/create', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: businessListingByUuid?.listingId,
            propertyUuid: businessListingByUuid?.uuid,
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

    }, [currentUser, totalPrice, dateRange.startDate, dateRange.endDate, businessListingByUuid?.listingId, businessListingByUuid?.uuid, loginModal, router])


    const category = useMemo(() => {
        return CategoriesOnlyBusinesses.find((item) => 
        item.label === businessListingByUuid.category as any);
    }, [businessListingByUuid.category]);


    // For Everytime There is a change on Reservation Calendar
    useEffect(() => {

        if(dateRange.startDate && dateRange.endDate){
            // It's gonna count how mnay days are selected
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            
            const newPrice = 100.00

            // It's gonna count how many days per night is selected
            if(dayCount && newPrice){
                setTotalPrice(dayCount * parseFloat(newPrice as any))
            }else{
                // If no multiple day count
                setTotalPrice(parseFloat(newPrice as any))
            }
        }
    
        
    }, [dateRange, businessListingByUuid?.sellPrice])
    

    
    
    return ( 

        <div className="max-w-screen-lg mx-auto mb-14">
            
            <div className="flex flex-col gap-6">
            
              
           
                <ListingBbHead 
                    title={businessListingByUuid?.title}
                    imageSrc={businessListingByUuid?.imageSrc || null}
                    locationValue={businessListingByUuid?.locationValue as any}
                    country={businessListingByUuid?.country?.label as any}
                    countryStateRegion={businessListingByUuid?.countryStateRegion?.name as any}
                    countryCity={businessListingByUuid?.countryCity?.name as any}
                    uuid={businessListingByUuid?.uuid as string}
                    currentUser={currentUser as any}
                />

                
                        <ListingBbBusinessInfo 
                            user={currentUser as any}
                            description={businessListingByUuid?.description}
                            guestCount={0}
                            roomCount={0}
                            bathroomCount={0}
                            category={category}
                            locationValue={businessListingByUuid as any}
                            country={businessListingByUuid?.country?.latlng}
                            countryStateRegion={businessListingByUuid?.countryStateRegion?.latlng}
                            countryCity={businessListingByUuid?.countryCity?.latlng}
                        />

               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">

                        {/*                         
                        <div className="order-first mb-10 md:order-last md:col-span-3">

                            <ListingBbBusinessReservation
                                sellPrice={parseFloat(businessListingByUuid?.sellPrice) || 100.00}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />

                        </div> */
                        }


               </div>

                
            
            </div>

        </div>
    );
}
 
export default ListingBbBusinessClient;