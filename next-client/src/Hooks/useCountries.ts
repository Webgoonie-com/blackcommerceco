
import { Country, State, City }  from 'country-state-city';

const countries =  Country.getAllCountries()
console.log('Line 5: countries', countries)

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
    console.log('Activated Use Countries')

    const getAllCountries = () => formattedCountries;

    console.log('getAllCountries', getAllCountries)

    const getByValue = (value: string) => {
        
        console.log('Before get value', value)
        // console.log('formattedCountries', formattedCountries.find((item) => item.value === value))

        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAllCountries,
        getByValue
    }
};


export default useCountries;
