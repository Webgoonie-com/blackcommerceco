"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from '@/Components/modals/Modal'

import useBusinessRegistrationModal from '@/Hooks/useBusinessRegistrationModal'

import ModalHeading from '../../ModalHeading';

import { businesses } from '@/Components/navbar/categories/CategoriesBusinesses'

import CategoryInput from '@/Elements/Inputs/CategoryInput';

import Input from '@/Elements/Inputs/Input';

import SelectCountry from '@/Elements/Selects/SelectCountry';
import SelectStateRegion from '@/Elements/Selects/SelectStateRegion';
import SelectCityByRegion from '@/Elements/Selects/SelectCityByRegion';
import dynamic from 'next/dynamic';
import Switch from '@/Elements/Switches/Switch';
import { User } from 'next-auth';


// import  Map from "@/Components/maps/Map";  // We dynamically loop the map on ssr

enum STEPS {
    CATEGORY = 0,
    country = 1,
    STATSINFO = 2,
    LOCALINFO = 3,
    INFO = 4,
    IMAGES = 5,
    DESCRIPTION = 6,
    PRICE = 7,
}

interface BusinessStoreResgistrationModalProps {
    currentUser?: User | null;
}


const BusinessStoreResgistrationModal: React.FC<BusinessStoreResgistrationModalProps> = ({currentUser}) => {
    const businessRegistrationModal = useBusinessRegistrationModal()


    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)
  
    //console.log('Line 31 Current User ON Rental Modal', currentUser)

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
            userId: currentUser?.Id,
            category: '',
            country: null,
            countryStateRegion: null,
            cityinfo: null,
            isAFranchise: null,
            isTheFranchiseParent: null,
            ownsOtherBusinesses: null,
            newStateCodeInfo: null,
            hasStore: 1,
            hasProducts: 1,
            hasServices: 1,
            imageSrc: '',
            price: 1,   //Don't kow what to do with price
            title: '',
            description: ''
        }
    })

    const watchCategory = watch('category')

    const watchCountry  = watch('country')

    const watchCountryStateRegion  = watch('countryStateRegion')
 
    const watchCountryCity  = watch('countryCity')

    const watchStreetAddress  = watch('streetAddress')
    const watchStreetAddress2  = watch('streetAddress2')
    const watchStreetCity  = watch('streetCity')
    const watchStreetZipCode  = watch('streetZipCode')
    
    const watchIsAFranchise  = watch('isAFranchise')

    const watchIsTheFranchiseParent  = watch('isTheFranchiseParent')

    const watchOwnsOtherBusinesses  = watch('ownsOtherBusinesses')

   

   
    const  Map = useMemo(() => dynamic(() => import("@/Components/maps/Map"), {
        ssr: false
    }), [])

    const onSwitchChange = (id: string, value: any) => {
        console.log('onSwitchChange id: ', id)
        console.log('onSwitchChange value: ', value)
        setCustomValue(id, value); // Update the value in the parent component
    };

    const setCustomValue = (id: string, value: any) => {
        console.log('id Line 125 setValue', id)
        console.log('Line 126 setValue', value)
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
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


    
            
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
            
    
        console.log('DATA: on onSubmit: ', data)
    

        try {

            // Calling Directly To Internal API Route
    
            
        } catch (error) {
            console.error(error);
        }

        if(step !== STEPS.PRICE){
            return onNext()
        }


    


        try {

            // Calling Directly To Internal API Route
    
            
        } catch (error) {
            console.error(error);
        }

        if(step !== STEPS.PRICE){
            return onNext()
        }


    }

    let bodyContent = (
        <div>
            <ModalHeading 
            title={"List My Business"}
            subtitle='Pick a Category'
            />
        
        <div
                    className='
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
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

    // Begin Steps

    if (step === STEPS.country) {
        
        bodyContent = (
            <div
                className={`
                    flex flex-col gap-8
                    text-white
                `}
                >
                <ModalHeading
                    title={"We need To get the Geo Market placement of your Business"}
                    subtitle={"Help others find you in their market and mark your business on the map..."}
                />
                
                <div className="grid md:grid-cols-3 xl:grid-cols-3 grid-flow-row auto-rows-max z-50">
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
                        value={watchCountryCity}
                        onChange={(value) => setCustomValue('countryCity', value)}
                        errors={errors}
                        register={register}
                    />
                    
                </div>
                <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3 z-0'>
                        <Map
                            center={
                                watchCountryCity?.latitude && watchCountryCity?.longitude ? [watchCountryCity?.latitude, watchCountryCity?.longitude] :
                                //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
                                watchCountryStateRegion?.latitude && watchCountryStateRegion?.longitude ? [watchCountryStateRegion?.latitude, watchCountryStateRegion?.longitude] :
                                watchCountry?.latitude && watchCountry?.longitude ? [watchCountry?.latitude, watchCountry?.longitude] : [32.1652613142917, -54.72682487791673]
                            }
                        />
                </div>
            </div>
        )
    }

    if (step === STEPS.STATSINFO) {
        {console.log('Line 294 watchIsAFranchise:', watchIsAFranchise)}
        {console.log('Line 296 watchIsAFranchise:', watchIsAFranchise)}
        {console.log('Line 296 watchOwnsOtherBusinesses:', watchOwnsOtherBusinesses)}
        bodyContent = (
            <div
                className={`
                    flex flex-col gap-8
                    text-white
                `}
            >
                <ModalHeading
                    title={"Business physical address?"}
                    subtitle={"Help others such as drivers and other customers visit you we will provide customers your directions..."}
                />
                
                <div className="position-relative px-2 col">
                    

                <Switch
                    id={"isAFranchise"}
                    posCnt={1}
                    title={'Is This Business A Franchise?'} 
                    subtitle={'Business owned by another parent company and/or apart of a chain of stores under a common parent company.'} 
                    onChange={(value) => setCustomValue('isAFranchise', value)}
                    checked={watchIsAFranchise}
                    
                    errors={errors}
                    register={register}
                />
                <hr />
                <Switch
                    id={"isTheFranchiseParent"}
                    posCnt={2}
                    title={'Is This Business A Corportate Business?'}
                    subtitle={'Parent company owns other businesses/stores?'}
                    onChange={(value) => setCustomValue('isTheFranchiseParent', value)} 
                    checked={watchIsTheFranchiseParent}
                    errors={errors}
                    register={register}
                    
                />
                <hr />
                <Switch
                     id={"ownsOtherBusinesses"}
                     posCnt={3}
                     title={'Does this business own any other businesses?'}
                     subtitle={'Owns other businesses/stores?'}
                     onChange={(value) => setCustomValue('ownsOtherBusinesses', value)} 
                     checked={watchOwnsOtherBusinesses || false} // Initialize based on form value
                     errors={errors}
                     register={register}         
                />
                <hr />
                    

                    
                    
                    
                </div>
                <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3'>
                        <Map
                          center={
                              watchCountryCity?.latitude && watchCountryCity?.longitude ? [watchCountryCity?.latitude, watchCountryCity?.longitude] :
                              //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
                              watchCountryStateRegion?.latitude && watchCountryStateRegion?.longitude ? [watchCountryStateRegion?.latitude, watchCountryStateRegion?.longitude] :
                              watchCountry?.latitude && watchCountry?.longitude ? [watchCountry?.latitude, watchCountry?.longitude] : [32.1652613142917, -54.72682487791673]
                          }
                      />
                </div>
            </div>
        )
    }

    if (step === STEPS.LOCALINFO) {

        

        bodyContent = (
            <div
                className={`h-screen
                    flex flex-col gap-8
                    text-white
                `}
            >
                <ModalHeading
                    title={"Business physical address?"}
                    subtitle={"Help others such as drivers and other customers visit you we will provide customers your directions..."}
                />
                
                <div className="position-relative px-2 col">
                    

                    
    
                    <div className='position-relative md:px-2 xl:px-2 mb-3'>
                        <h2 className='px-2'>Street Address1</h2>
                        <Input
                            id="streetAddress1"
                            label="Address1"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            />
                    </div>

                    <div className='position-relative md:px-2 xl:px-2 mb-3'>
                        <h2 className='px-2'>Bldg/Suite/Apt#?</h2>
                        <Input
                            id="streetAddress2"
                            label="Address2"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            />
                    </div>

                    <div className='position-relative md:px-2 xl:px-2 mb-3'>
                        <h2 className='px-2'>Zip/Postal Code</h2>
                        <Input
                            id="busPostalcode"
                            label="Postal Code"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            />
                    </div>
                    
                    
                </div>
                <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3'>
                        <Map
                          center={
                              watchCountryCity?.latitude && watchCountryCity?.longitude ? [watchCountryCity?.latitude, watchCountryCity?.longitude] :
                              //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
                              watchCountryStateRegion?.latitude && watchCountryStateRegion?.longitude ? [watchCountryStateRegion?.latitude, watchCountryStateRegion?.longitude] :
                              watchCountry?.latitude && watchCountry?.longitude ? [watchCountry?.latitude, watchCountry?.longitude] : [32.1652613142917, -54.72682487791673]
                          }
                      />
                </div>
            </div>
        )
    }



      
    return (
        <Modal
            isOpen={businessRegistrationModal.isOpen}
            onClose={businessRegistrationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            //onSubmit={OnNext}
            actionLabel={actionLabel}
            title='Crate A Listing For My Business'
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default BusinessStoreResgistrationModal