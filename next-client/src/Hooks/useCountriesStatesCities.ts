//  https://classic.yarnpkg.com/en/package/countries-states-cities
import csc from 'countries-states-cities'

const useCountriesStatesCities = () => {

    
    const getAllCitiesOfStateCountriesCSC = (isoCode: string, countryCode: string) => {

        console.log('Line 9: csc.countryCode', countryCode)
        console.log('Line 10: csc.isoCode', isoCode)

        const country = csc.getCountryByCode(countryCode);
        console.log('first country', country)
        const states = csc.getStatesOfCountry(country?.iso2 as any);
        console.log('Line 15 csc.states', states)
        const citiesFromFirstState = csc.getCitiesOfState(states[0].id);
        console.log('citiesFromFirstState', citiesFromFirstState)

        return citiesFromFirstState

    }

    const getAllCountriesCSC = () => {
        const countries = csc.getAllCountries();

        return countries;
    }


    return {
        getAllCountriesCSC,
        getAllCitiesOfStateCountriesCSC,
        //  getByValueCountriesStatesCities,
        //  getStateRegionsByCountryCountriesStatesCities,
        //  getAllCitiesOfStateCountriesStatesCities
    }
}

export default useCountriesStatesCities