"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';


import { businesses } from '@/Components/navbar/categories/CategoriesBusinesses'
import ModalHeading from '@/Components/modals/ModalHeading';

import CategoryInput from '@/Elements/Inputs/CategoryInput';

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

const BusinessCreation = () => {

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

    const watchLocation = watch('location')
 
    const watchLocalinfo  = watch('localinfo')

    const watchCityinfo  = watch('cityinfo')

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
            
    
    

        try {

            // Calling Directly To Internal API Route
    
            
        } catch (error) {
            console.error(error);
        }

    }

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const OnNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.CATEGORY){
          return  undefined
      }

      return 'Back';
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
          <ModalHeading 
            title={stringName+" List A New Business"}
            subtitle='Pick a Category'
            />


            <div
                    className='
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[60vh]
                    overflow-y-auto
                '
                >
                    
                    {businesses.map((item) => (

                        <div
                            className='cursor-pointer col-col-span-1'
                            key={item.label}
                        >
                            {/* item.label  */}
                            <CategoryInput
                                onClick={(category) =>
                                    setCustomValue('category', category)}
                                selected={watchCategory == item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>


                    ))}
                    
        </div>

          
        </div>
      )

    return (
        <div className='bg-slate-500 h-screen'>
            
            <div className="absolute grid md:grid-cols-3 xl:grid-cols-3 grid-flow-row auto-rows-max mb-14 z-50">
            <h2>Business Creation</h2>

            <p>Create a new business listing here</p>

            <p>{currentUser?.firstName} {currentUser?.lastName}</p>

                  <SelectCountry
                          value={watchLocation}
                          onChange={(value) => setCustomValue('location', value)}
                      />
      
                  <SelectStateRegion
                      location={watchLocation}
                      localinfo={watchLocalinfo}
                      value={watchLocalinfo}
                      onChange={(value) => setCustomValue('localinfo', value)}
                  />
  
                  <SelectCityByRegion
                      location={watchLocation}
                      localinfo={watchLocalinfo}
                      value={watchCityinfo}
                      onChange={(value) => setCustomValue('cityinfo', value)}
                  />
              </div>

           
              <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3 z-0'>
                        <MapFull
                            center={
                                watchCityinfo?.latitude && watchCityinfo?.longitude ? [watchCityinfo?.latitude, watchCityinfo?.longitude] :
                                //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
                                watchLocalinfo?.latitude && watchLocalinfo?.longitude ? [watchLocalinfo?.latitude, watchLocalinfo?.longitude] :
                                watchLocation?.latitude && watchLocation?.longitude ? [watchLocation?.latitude, watchLocation?.longitude] : [32.1652613142917, -54.72682487791673]
                            }
                        />
              </div>

            
                    

                    {/* {bodyContent} */}
            
        </div>
    )
}

export default BusinessCreation