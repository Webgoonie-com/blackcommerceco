//SelectStateRegion.tsx

'use client'

import React, { useEffect, useState, useRef } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import useCountryStateZip from '@/Hooks/useCountryStateZip'

import { ICountry, IState, ICity } from 'country-state-city'
import "flag-icons/css/flag-icons.min.css";

export type StateRegionSelectValue = {
    value: string;
    label: string;
    countryCode: string;
    isoCode: string;
    latlng: number[];
    latitude: number;
    longitude: number;
    name: string;
}

interface StateRegionSelectProps {
    country?: any | null,
    countryStateRegion?: any | null,
    value?: StateRegionSelectValue;
    onChange: (value: StateRegionSelectValue | null) => void;
}

const SelectStateRegion: React.FC<StateRegionSelectProps> = ({
    country,
    countryStateRegion,
    value,
    onChange
}) => {
    // console.log('Am I getting SelectStateRegion.tsx country', country)
    // console.log('Am I getting SelectStateRegion.tsx country?.isoCode', country?.isoCode)
    // console.log('Am I getting SelectStateRegion.tsx countryStateRegion', countryStateRegion)
    // console.log('Am I getting SelectStateRegion.tsx countryStateRegion?.isoCode', countryStateRegion?.isoCode)

    const { getStateRegionsByCountry } = useCountryStateZip();
    
    const animatedComponents = makeAnimated();

    const [stateOptions, setStateOptions] = useState<StateRegionSelectValue[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statesLoaded, setStatesLoaded] = useState(false);
    const [statesChanged, setStatesChanged] = useState(false);
    const [selectedValue, setSelectedValue] = useState<StateRegionSelectValue | null>();

    const selectInputRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (country?.isoCode) {
                    //console.log('hitting states country', country?.isoCode);
                    const stateRegions = getStateRegionsByCountry(country?.isoCode);
                    const formattedStateRegions = stateRegions.map((state) => ({
                        value: state.isoCode,
                        label: state.name,
                        countryCode: state.countryCode,
                        latlng: [state.latitude, state.longitude],
                        latitude: state.latitude,
                        longitude: state.longitude,
                        name: state.name,
                        isoCode: state.isoCode,
                    }));
                    setStateOptions(formattedStateRegions as any);
                } else {
                    // No country selected, clear state options
                    //console.log('Not hitting States');
                    setStateOptions([]);
                }

            } catch (error) {
                console.error('Error fetching state regions:', error);
            }
        };
    
        // Include getStateRegionsByCountry in the dependency array
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country?.isoCode]); // Can't Add getStateRegionsByCountry here or it will keep looping
    
    
    
    
    
    
    
    
    

    return (
        <div className="position-relative px-2 col">
            <h2>Select State Region</h2>
            <Select
                key={`my_unique_selectstateregion_key__${value}`}
                placeholder="Select State / Region"
                isClearable
                className="text-black z-50"
                options={stateOptions as any}
                getOptionLabel={(option) => option.name}
                value={value || ''}
                onChange={(value) => onChange(value as StateRegionSelectValue)}
                closeMenuOnSelect={true}
                components={animatedComponents}
                formatOptionLabel={(option: any) => (
                    // console.log('option', option),
                    <div className="
                            flex flex-row items-center gap-3"
                    >
                        {/* Implmented Custom Flags to Work on All Browswers */}
                        {/* <div>{option.flag}</div> */}
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
}

export default SelectStateRegion