"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import SelectCountry from '@/Elements/Selects/SelectCountry';
import SelectStateRegion from '@/Elements/Selects/SelectStateRegion';
import SelectCityByRegion from '@/Elements/Selects/SelectCityByRegion';
import CountrySelect from '@/Elements/Selects/CountrySelect';

import  Map from "@/Components/maps/Map";  // We dynamically loop the map on ssr
import MapFull from '@/Components/maps/MapFull';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  STATSINFO = 2,
  LOCALINFO = 3,
  INFO = 4,
  IMAGES = 5,
  DESCRIPTION = 6,
  PRICE = 7,
}

const BusinessPropertyCreation = () => {


  const { data: session, status } = useSession();
  const currentUser = session?.user;

  const [step, setStep] = useState(STEPS.CATEGORY)
    const [stringName, setStringName] = useState(`${currentUser?.firstName}` + ' ' + `${currentUser?.lastName}`)
    const [isLoading, setIsLoading] = useState(false)
  
    console.log('Line 31 Current User ON Rental Modal', currentUser)

    const { register,
            handleSubmit, 
            setValue, 
            watch, 
            formState: { 
                errors 
            },
            reset
        } = useForm<FieldValues>({
        defaultValues: {
            userId: session?.user?.uuid,
            category: '',
            location: null,
            town: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            title: '',
            description: '',
            price: 1.00,
        }
    })

    const watchCategory = watch('category')

    const watchCountry = watch('location')
 
    const watchCountryStateRegion  = watch('countryStateRegion')

    const watchCityinfo  = watch('cityinfo')

    

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
      })
    }


    return (
        <div className='h-screen'>
        
            <div className="absolute px-32 grid md:grid-cols-3 xl:grid-cols-3 grid-flow-row auto-rows-max mb-14 z-10">
          <h2>Black Property Creation</h2>

          <p>Create A New Property Listing As A Black And Or Black Friendly Property.</p>

          <p>{currentUser?.firstName} {currentUser?.lastName}</p>

                <SelectCountry
                    id={'country'}
                    value={watchCountry}
                    onChange={(value) => setCustomValue('country', value)}
                    register={register}
                    errors={errors}
                    required
                />
      
                <SelectStateRegion
                    id={'countryStateRegion'}
                    country={watchCountry}
                    countryStateRegion={watchCountryStateRegion}
                    value={watchCountryStateRegion}
                    onChange={(value) => setCustomValue('countryStateRegion', value)}
                    errors={errors}
                    register={register}
                />
  
                <SelectCityByRegion
                    id={'countryCity'}
                    country={watchCountry}
                    countryStateRegion={watchCountryStateRegion}
                    value={watchCityinfo}
                    onChange={(value) => setCustomValue('countryCity', value)}
                    errors={errors}
                    register={register}
                  />
            </div>

           
            <div className='relative md:w-full xl:w-full md:px-0 xl:px-0 mb-0 z-0'>

                <MapFull
                    mapCenterReasonTxt={""}
                    center={
                        watchCityinfo?.latitude && watchCityinfo?.longitude ? [watchCityinfo?.latitude, watchCityinfo?.longitude] :
                        //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
                        watchCountryStateRegion?.latitude && watchCountryStateRegion?.longitude ? [watchCountryStateRegion?.latitude, watchCountryStateRegion?.longitude] :
                        watchCountry?.latitude && watchCountry?.longitude ? [watchCountry?.latitude, watchCountry?.longitude] : [32.1652613142917, -54.72682487791673]
                    }
                />

            </div>

        </div>
    )
}

export default BusinessPropertyCreation