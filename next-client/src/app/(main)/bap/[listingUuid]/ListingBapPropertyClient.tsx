"use client"

import { PropertyListing, Reservation, User } from "@/Types";
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
    propertylistingByUuid: PropertyListing & {
        user: PropertyListing & {
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

    // console.log('propertylistingByUuid', propertylistingByUuid)


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
            propertyUuid: propertylistingByUuid?.uuid,
            userId: currentUser.id
        })
        .then(() => {

            toast.success('Your Reservation Is Now Reserved!', {
                duration: 7000,
                position: 'bottom-right',
            })

            setDateRange(initialDateRange)

            // Redirect to /trips
            
            setTimeout(() => {
                
                router.push('/pendingstays')
                
            }, 3000);

            router.refresh()
        })
        .catch(() => {
            toast.error('something went wrong making your reservation just now')
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [currentUser, totalPrice, dateRange.startDate, dateRange.endDate, propertylistingByUuid?.uuid, loginModal, router])


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
            if (dayCount && propertylistingByUuid?.price) {
                const pricE = parseFloat(propertylistingByUuid?.price); // Parse the price to a float number
                const totalPrice = dayCount * pricE; // Perform the multiplication
                setTotalPrice(parseFloat(totalPrice.toFixed(2))); // Apply toFixed() to the result and then parse it back to float for setting the state
            } else {
                // If no multiple day count
                setTotalPrice(parseFloat(propertylistingByUuid?.price));
            }
        }
    
        
    }, [dateRange, propertylistingByUuid?.price])
    

    // console.log('propertylistingByUuid', propertylistingByUuid)
    // console.log('Lie 138 propertylistingByUuid?.country?.name', propertylistingByUuid?.country?.name)
    
    
    return ( 

        <div className="max-w-screen-lg mx-auto mb-14">
            
            <div className="flex flex-col gap-6">
            
              
            

                <ListingBapHead 
                    title={propertylistingByUuid?.title}
                    imageSrc={propertylistingByUuid?.imageSrc || null}
                    locationValue={propertylistingByUuid?.locationValue as any}
                    country={propertylistingByUuid?.country?.name as any}
                    countryStateRegion={propertylistingByUuid?.countryStateRegion?.name as any}
                    countryCity={propertylistingByUuid?.countryCity?.name as any}
                    uuid={propertylistingByUuid?.uuid as string}
                    currentUser={currentUser as any}
                />

                

               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">

                        <ListingBapPropertyInfo 
                            user={currentUser as any}
                            description={propertylistingByUuid?.description}
                            guestCount={propertylistingByUuid?.guestCount}
                            roomCount={propertylistingByUuid?.roomCount}
                            bathroomCount={propertylistingByUuid?.bathroomCount}
                            category={category}
                            locationValue={propertylistingByUuid as any}
                            country={[propertylistingByUuid?.country?.latitude, propertylistingByUuid?.country?.longitude] as any}
                            countryStateRegion={[propertylistingByUuid?.countryStateRegion?.latitude, propertylistingByUuid?.countryStateRegion?.longitude] as any}
                            countryCity={[propertylistingByUuid?.countryCity?.latitude, propertylistingByUuid?.countryCity?.longitude] as any}
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