
import { Country, State, City }  from 'country-state-city';

const countries =  Country.getAllCountries()
//console.log('Line 5: countries', countries)

const formattedCountries = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
    flag: country.flag,
    latlng: [parseFloat(country.latitude), parseFloat(country.longitude)],
    latitude: parseFloat(country.latitude), // Convert to number
    longitude: parseFloat(country.longitude), // Convert to number
    region: country.name,
    isoCode: country.isoCode,
    name: country.name,
    timezones: [],
}))

const useCountries = () => {
    const getAllCountries = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAllCountries,
        getByValue
    }
};


export default useCountries;
