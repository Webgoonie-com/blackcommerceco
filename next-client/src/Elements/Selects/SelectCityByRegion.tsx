import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import useCountryStateZip from '@/Hooks/useCountryStateZip';
import useCsc from '@/Hooks/useCountriesStatesCities'
import { ICity } from 'country-state-city';

export type CitySelectValue = {
    currency: string;
    flag: string;
    isoCode: string;
    latitude: number;
    longitude: number;
    name: string;
    phonecode: string;
    timezones: [];
    value: string;
};

interface CountrySelectProps {
    location?: any | null;
    localinfo?: any | null;
    cityinfo?: any | null;
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
}

const SelectCityByRegion: React.FC<CountrySelectProps> = ({
    location,
    localinfo,
    cityinfo,
    value,
    onChange
}) => {

    const { getAllCitiesOfState } = useCountryStateZip();
    const { getAllCitiesOfStateCountriesCSC } = useCsc();
    
    const animatedComponents = makeAnimated();

    const [cityOptions, setCityOptions] = useState<CitySelectValue[]>([]);
    
    const [citiesLoaded, setCitiesLoaded] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
                if (
                    localinfo?.countryCode !== 'undefined' &&
                    localinfo?.isoCode !== 'undefined'
                ) {

                    try {    

                        const stateRegions = getAllCitiesOfState(localinfo?.isoCode, localinfo?.countryCode);
                        const formattedStateRegions = stateRegions.map((city) => ({
                            value: city.name,
                            label: city.name,
                            countryCode: city.countryCode,
                            latlng: [city.latitude, city.longitude],
                            latitude: city.latitude,
                            longitude: city.longitude,
                            name: city.name,
                        }));
                        setCityOptions(formattedStateRegions as any);
                        //setCitiesLoaded(!citiesLoaded)
                    } catch (error){
                        console.error('Error fetching cities:', error)
                    }
                } else {
                    // No country selected, clear state options
                    setCityOptions([]);
                }
        };

        // Fetch data only when location or isoCode changes
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localinfo?.isoCode, localinfo?.countryCode]);

    return (
        <div className="position-relative px-2 col">
            <h2>Select Nearest City</h2>
            
                <Select
                    key={`my_unique_selectcitybyregion_key__${value}`}
                    placeholder="Select Nearest City"
                    isClearable={true}
                    className="text-black z-10"
                    options={cityOptions as any}
                    getOptionLabel={(option) => option.name}
                    value={value || ''}
                    onChange={(newValue) => onChange(newValue as CitySelectValue)}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    formatOptionLabel={(option: any) => (
                        ///console.log('city options', option),
                        <div className="
                                flex flex-row items-center gap-3"
                        >
                            <span       
                                className={`fi fi-${option.countryCode.toLowerCase()}`}
                            >
                            </span>

                            <span>
                                <span className="text-neutral-500 ml-1">
                                    {option.name}
                                </span>
                            </span>
                        </div>
                    )}
                    classNames={{
                        control: () => 'md:p-3 md:border-2 xl:p-3 xl:border-2',
                        input: () => 'text-sm md:text-lg xl:text-lg',
                        option: () => 'text-sm md:text-lg xl:text-lg',
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                            ...theme.colors,
                            primary: 'black',
                            primary25: 'rgb(107 33 168 / var(--tw-bg-opacity))'
                        }
                    })}

                />
            
        </div>
    )
};

export default SelectCityByRegion;
