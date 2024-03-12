//SelectCountry.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import useCountryStateZip from '@/Hooks/useCountryStateZip';

import 'flag-icons/css/flag-icons.min.css';

export type CountrySelectValue = {
    value: string;
    label: string;
    currency: string;
    phonecode: string;
    flag: string;
    latlng: number[];
    latitude: number;
    longitude: number;
    region: string;
    isoCode: string;
    name: string;
    timezones: string[];
};

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue | null) => void; // Update the onChange type
}

const SelectCountry: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAllCountries } = useCountryStateZip();
    const animatedComponents = makeAnimated();

    const [countryOptions, setCountryOptions] = useState<CountrySelectValue[]>([]);
    const [Top, setTop] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <div className="position-relative px-2 col z-50">
            <h2>Select Country</h2>
            <Select
                key={`my_unique_selectcountry_key__${value}`}
                placeholder="Select Your Country"
                isClearable
                className="position-relative text-black"
                options={getAllCountries()}
                //options={countryOptions as any}
                getOptionLabel={(option) => option.name}
                value={value || ''}
                onChange={(value) => onChange(value as CountrySelectValue)}
                closeMenuOnSelect={true}
                onMenuOpen={() => setIsMenuOpen(true)}
                onMenuClose={() => setIsMenuOpen(false)}
                
                components={animatedComponents}
                formatOptionLabel={(option: any) => (
                    // console.log('option', option),
                    <div className="flex flex-row items-center gap-3 z-50">
                        <span
                            
                            className={`fi fi-${option?.isoCode.toLowerCase()}`}
                        >
                        </span>

                        <div>
                            {option.isoCode},
                            <span className="text-neutral-500 ml-1">
                                {option.name}
                            </span>
                        </div>
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
    );
};

export default SelectCountry;
