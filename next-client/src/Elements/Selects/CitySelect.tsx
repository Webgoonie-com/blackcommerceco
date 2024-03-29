'use client'

import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import useCities from '@/Hooks/useCities'

import { ICountry, IState, ICity } from 'country-state-city'
import makeAnimated from 'react-select/animated';

export type CitySelectValue = {
    countryCode: string;
    latitude: number,
    longitude: number,
    name: string;
    stateCode: number,
    value: string,
}


interface CitySelectProps {
    location?: any | null,
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
}


const CitySelect: React.FC<CitySelectProps> = ({
    location,
    value, // Receive `town` as a prop
    onChange, // Receive `setCustomValue` function as a prop
}) => {
    
    // const [country, setCountry] = useState("");
    // const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [cityOptions, setCityOptions] = useState<ICity[]>([]);

    

    // console.log('location on CitySelect', JSON.stringify(location))
    // console.log('location on CitySelect location?.value', location?.value)
    const { getAll } = useCities()
    const { getByFilterValue } = useCities()
    const { getByFilter } = useCities()

    const resultsFilterValue = getByFilterValue(location?.value);

    useEffect(() => {
        if (location?.value) {
            // console.log('Line 46 City Select resultsFilterValue', resultsFilterValue);
            if (resultsFilterValue) {
                setCityOptions(resultsFilterValue);
            }
        }
    }, [location?.value, resultsFilterValue]);
    

    return (
        <div className="position-relative">
            <h2>City Select</h2>
            <Select
                placeholder="Anywhere"
                isClearable
                className="text-black"
                options={cityOptions as any}  // prepares dynamic row list
                getOptionLabel={(option) => option.name}  // Makes the lables appear on map loop

                value={value}   // this the magic that passes it back to RentMyPropertyModal
                onChange={(value) => onChange(value as CitySelectValue)} // this the magic that passes it back to RentMyPropertyModal
                
            />
        </div>
    )
}

export default CitySelect