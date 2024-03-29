


import wCities from "worldcities"
import React from 'react'

// const WorldCities = require('worldcities');
// const city = WorldCities.getNearestCity(5.42282298420212, 100.33753796627954)

console.log('Line 10 city', wCities)

// const formattedCities = wCities.map((City: any) => ({
//   cityId: City.cityId,
//   name: City.name,
//   latlng: City.coordinates.loc,
//   country: City.country,
//   value: City.name,

// }))

console.log('Line 4 city', wCities)



const useCities = () => {

  //const getAll = () => formattedCountries;

  const getAll = (value: string) => {
    
    const city = wCities.getByName(value);
    
    return city
  }

  const getByFilterValue = (value: string) => {
    
    const city = wCities.getCountry(value);
    
    return city
  }

  const getByFilter = (latlng: number[]) => {
    console.log('latlng', latlng)
    const [longitude, latitude] = latlng;
    

    const city = wCities.getNearestLargeCity(longitude, latitude);
    console.log('city on 49 useCities', city)

    // const formattedCities = city.map((City: any) => ({

    // }))
    //const city = wCities.getNearestLargeCity(17.076480407330514, -101.3674415353851);
    return city
  } 

  return {
    getAll,
    getByFilterValue,
    getByFilter
  }
}

export default useCities
