/* For References https://classic.yarnpkg.com/en/package/country-state-city  */
import React from 'react'
import { Country, State, City }  from 'country-state-city';
// console.log(Country.getAllCountries())
// console.log(State.getAllStates())

import { ICountry, IState, ICity } from 'country-state-city'


//console.log('Line 10 city', csc)
//console.log(Country.getAllCountries())

const countries =  Country.getAllCountries()

//const states = State.getStatesOfCountry(country.isoCode);

//console.log('Line 15: ', countries)


// const countryCode = 'US';
// const country = csc.getCountryByCode(countryCode);
// const states = csc.getStatesOfCountry(country.isoCode);
// states.forEach((state) => {
//     cities_of_state = csc.getCitiesOfState(countryCode, state.isoCode)
//     console.log(state, ":", cities_of_state)
// }

const stateRegions = (countryCode: string) => {
        
    const states = State.getStatesOfCountry(countryCode);
    //console.log('Line 34 countryCode: ', countryCode)

    const formattedStateRegions = states.map((state) => ({
        value: state.isoCode,
        label: state.name,
        countryCode: state.countryCode,
        latlng: [state.latitude, state.longitude],
        // currency: state.currency,
        // phonecode: state.phonecode,
        // flag: state.flag,
        // latlng: [parseFloat(state.latitude), parseFloat(state.longitude)],
        latitude: state.latitude, // Convert to number
        longitude:state.longitude, // Convert to number
    }))
    
    return states
}

const formattedCountries = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
    currency: country.currency,
    phonecode: country.phonecode,
    flag: country.flag,
    latlng: [parseFloat(country.latitude), parseFloat(country.longitude)],
    latitude: parseFloat(country.latitude), // Convert to number
    longitude: parseFloat(country.longitude), // Convert to number
    region: country.name,
    isoCode: country.isoCode,
    name: country.name,
    timezones: [],
}))







const useCountryStateZip = () => {

    const getAllCountries = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    const getStateRegionsByCountry = (countryCode: string) => {
        // You can call your existing stateRegions function here
        const state = State.getStatesOfCountry(countryCode)
        //console.log('states: ', state)

        return state
    }

    const getAllStateByCodeAndCountry = (stateCode: string, countryCode: string) => {
        // You can call your existing stateRegions function here
        const state = State.getStateByCodeAndCountry(stateCode, countryCode)
        //console.log('states: ', state)

        return state
    }

    const getAllCitiesOfState = (isoCode: string, countryCode: string) => {
        // console.log('Hit getAllCitiesOfState')
        // console.log('Line 88: countryCode', countryCode)
        // console.log('Line 89: isoCode', isoCode)

        const country = Country.getCountryByCode(countryCode);
        // console.log('fLine 92: irst country', country)
        // console.log('Line 93 first getStatesOfCountry(country?.isoCode', country?.isoCode)

        const states = State.getStateByCodeAndCountry(isoCode, countryCode);
        //console.log('second state', states)
        
        const citiesFromFirstState = City.getCitiesOfState(countryCode, isoCode);
        // console.log('citiesFromFirstState', citiesFromFirstState)
        
        // console.log('citiesFromFirstState', citiesFromFirstState)

        return citiesFromFirstState

    }

    // const getAllStateRegions = () => stateRegions;
    // console.log('getAllStateRegions', getAllStateRegions)


    return {
        getAllCountries,
        getByValue,
        getStateRegionsByCountry,
        getAllStateByCodeAndCountry,
        getAllCitiesOfState
    }
}

export default useCountryStateZip
