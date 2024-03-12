'use client'

import React from 'react'
import Select from 'react-select'
import useCities from '../../../hooks/useCities_worldCities'

// const cities = require('all-the-cities');
// cities.filter((city: { name: string; }) => city.name.match('Albuquerque'));

// import makeAnimated from 'react-select/animated';

export type CitySelectValue = {
    cityId: string;
    name: string;
    latlng: number[],
    country: string;
    value: string
}

//console.log('Line 22! useCountries', JSON.stringify(useCities));

interface CitySelectProps {
    location?: any | null,
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
}


const CitySelect: React.FC<CitySelectProps> = ({
    location,
    value = location.value,
    onChange
}) => {

    console.log('location on CitySelect', JSON.stringify(location))
    console.log('location on CitySelect location?.value', location?.value)
    const { getAll } = useCities()
    const { getByFilterValue } = useCities()
    const { getByFilter } = useCities()


    if(location?.value){
        const resultsAll = getAll(location?.value)
        const resultsFilterValue = getByFilterValue(location?.value)
        
        console.log('Liine 46 City Select resultsAll', resultsAll)
        console.log('Liine 47 City Select resultsFilterValue', resultsFilterValue)
        
    }

    if(location?.latlng){
        const resultsFilter = getByFilter(location?.latlng)
        console.log('Liine 53 City Select resultsFilter', resultsFilter)
    }
   // const citys = {  } = useCities()
    //useCities()
    // const animatedComponents = makeAnimated();

   

    return (
        <div className="position-relative">
            <h2>City Select</h2>
            <Select 
            />
        </div>
    )
}

export default CitySelect