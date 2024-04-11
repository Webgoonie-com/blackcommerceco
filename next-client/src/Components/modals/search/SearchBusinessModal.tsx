"use client"

import qs from "query-string";
import useSearchBusinessModal from "@/Hooks/useSearchBusinessModal";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectValue } from "@/Elements/Selects/SelectCountry";
import { formatISO } from "date-fns";
import Heading from "@/Components/Heading";
import CountrySelect from "@/Elements/Selects/CountrySelect";
import MapSmall from "../../maps/MapSmall";
import CalendarProperty from "@/Elements/Calendars/CalendarProperty";
import Calendar from "@/Elements/Calendars/Calendar";
import Counter from "@/Elements/Counters/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}
const SearchBusinessModal = () => {

    const router = useRouter()

    const params = useSearchParams()

    const searchBusinessModal = useSearchBusinessModal();

    // a hack to set location
    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(() => dynamic(() => import('../../maps/MapSmall'), {

    }), [])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async() => {
        if (step !== STEPS.INFO) {
            return onNext()

        }

        let currentQuery = {}

        if(params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        // We have to transform our Start and Enddate Into Strings Because We have to use it in our url
        if (dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate){
            updatedQuery.startDate = formatISO(dateRange.endDate)
        }

        const openUrl = qs.stringifyUrl({
            url: '/bbs/',
            query: updatedQuery
        }, {skipNull: true})


            setStep(STEPS.LOCATION)

            searchBusinessModal.onClose()

            router.push(openUrl);
        

    }, 
    [
        bathroomCount,
        dateRange.endDate,
        dateRange.startDate,
        guestCount,
        location?.value,
        onNext,
        params, 
        roomCount,
        router,
        searchBusinessModal,
        step
    ])

    const actionLabel = useMemo(() => {
        
        if (step === STEPS.DATE) {
            return "Search"
        }

        return "Next"

    }, [step])

    const secondaryActionLabel = useMemo(() => {
        
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return "Back"

    }, [step])


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Choose A Country!"
                subtitle="Begin Your Search Here..."
            />

            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)
                    
                }
            />
            
            <hr />

            <MapSmall center={location?.latlng} />\

        </div>
    )

    if(step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Please Choose Your Dates"
                    subtitle="Select available dates for your for selection..."
                />

                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />

            </div>
        )
    }


    if(step === STEPS.INFO) {
        bodyContent= (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More Information"
                    subtitle="Find better results with exact answers"
                />
                <Counter
                    title="Guest"
                    subtitle="How many guest?"
                    value={guestCount}
                    onChange={(value) => {setGuestCount(value)}}
                />
                <Counter
                    title="Bed Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => {setRoomCount(value)}}
                />
                <Counter
                    title="Bath Rooms"
                    subtitle="How many bathrooms needed?"
                    value={bathroomCount}
                    onChange={(value) => {setBathroomCount(value)}}
                />
            </div>
        )
    }

    return ( 
        <Modal
            isOpen={searchBusinessModal.isOpen}
            onClose={searchBusinessModal.onClose}
            
            onSubmit={onSubmit}
            title="Business Search"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
     );
}
 
export default SearchBusinessModal;