'use client'


import useCountries from '@/Hooks/useCountries'
import React from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/animated';

// Creating Custom Flags world-countries flags only work in mozilla firefox related to windows
import "flag-icons/css/flag-icons.min.css";

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[],
    region: string;
    value: string
}

//console.log('Line 22! useCountries', JSON.stringify(useCountries));

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {

    const { getAllCountries } = useCountries()
    const animatedComponents = makeAnimated();

    return (
        <div className="position-relative">
            <h2>Country Selecting</h2>
            <Select
                placeholder="Anywhere"
                //isClearable
                className="text-black"
                options={getAllCountries()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                closeMenuOnSelect={true}
                components={animatedComponents}
                formatOptionLabel={(option: any) => (
                    //console.log('option', option),
                    <div className="
                            flex flex-row items-center gap-3"
                    >
                        {/* Implmented Custom Flags to Work on All Browswers */}
                        {/* <div>{option.flag}</div> */}
                        <span
                            className={`fi fi-${option.value.toLowerCase()}`}
                        >
                        </span>

                        <div>
                            {option.label},
                            <span className="text-neutral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text=lg',
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

export default CountrySelect