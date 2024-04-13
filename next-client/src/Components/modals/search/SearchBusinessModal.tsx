"use client"

import qs from "query-string";
import useSearchBusinessModal from "@/Hooks/useSearchBusinessModal";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../Modal";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectValue } from "@/Elements/Selects/SelectCountry";
import Heading from "@/Components/Heading";
import CountrySelect from "@/Elements/Selects/CountrySelect";

//  import { formatISO } from "date-fns";
//  import MapSmall from "../../maps/MapSmall";
//  import Calendar from "@/Elements/Calendars/Calendar";
//  import Counter from "@/Elements/Counters/Counter";

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
    
    const [queryStatus, setQueryStatus] = useState<Boolean>(true);
    const [queryCatType, setQueryCatType] = useState<String>("businesses");

    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const MapSmall = useMemo(() => dynamic(() => import('../../maps/MapSmall'), {
        ssr: false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async() => {
        if (step !== STEPS.LOCATION) {
            return onNext()

        }

        // if (step !== STEPS.INFO) {
        //     return onNext()

        // }

        let currentQuery = {}

        if(params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            queryCatType: queryCatType,
            queryStatus: queryStatus,
            locationValue: location?.value,
        }

        

        const openUrl = qs.stringifyUrl({
            url: '/bbs/',
            query: updatedQuery
        }, {skipNull: true})


            setStep(STEPS.LOCATION)

            searchBusinessModal.onClose()

            router.push(openUrl);
        

    }, 
    [location?.value, onNext, params, queryCatType, queryStatus, router, searchBusinessModal, step])

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

            <MapSmall center={location?.latlng} />

        </div>
    )

    


   

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