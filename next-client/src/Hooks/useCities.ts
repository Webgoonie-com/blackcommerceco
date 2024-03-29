
import React from 'react'
import csc from 'country-state-city';
import { Country, State, City }  from 'country-state-city';
// console.log(Country.getAllCountries())
// console.log(State.getAllStates())

import { ICountry, IState, ICity } from 'country-state-city'

//console.log('Line 10 city', csc)





const useCities = () => {

  //const getAll = () => formattedCountries;

  const getCitiesFormatted = (value: string) => {
  const cities = City.getCitiesOfCountry(value);
  
  // Check if cities is defined and not empty before mapping
  if (cities && cities.length > 0) {
    const formattedCities = cities.map((city) => ({
      value: city.name,
      label: city.name,
      // Other properties you want to include
    }));
    
    return formattedCities;
  }
  
  // Handle the case where cities is undefined or empty
  return [];
  };
  
  console.log('Line 4 city', getCitiesFormatted)

  const getAll = (value: string) => {
    
    const city = City.getCitiesOfCountry(value);
    
    return city
  }

  const getAllCountries = (value: string) => {
    
    const country = Country.getAllCountries();
    
    return country
  }

  const getByFilterValue = (value: string) => {
    
    //const city = Country.getAllCountries();
    const city = City.getCitiesOfCountry(value);
    
    return city
  }

  const getByFilter = (latlng: number[]) => {
    console.log('latlng', latlng)
    const [longitude, latitude] = latlng;
    

    
    console.log('city on 49 useCities', longitude, latitude)

    // const formattedCities = city.map((City: any) => ({

    // }))
    //const city = wCities.getNearestLargeCity(17.076480407330514, -101.3674415353851);
    return {longitude, latitude}
  } 

  return {
    getAll,
    getAllCountries,
    getByFilterValue,
    getByFilter
  }
}

export default useCities
