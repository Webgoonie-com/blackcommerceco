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


import  Map from "@/Components/maps/Map";  // We dynamically loop the map on ssr

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

const BusinessStoreResgistrationModal = () => {
    const businessRegistrationModal = useBusinessRegistrationModal()

    const { data: session, status } = useSession();
    const currentUser = session?.user;

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
            userId: session?.user?.uuid,
            category: '',
            location: null,
            localinfo: null,
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

    const watchLocation  = watch('location')

    const watchLocalinfo  = watch('localinfo')

    const watchCityinfo  = watch('cityinfo')

    const watchGuestCount = watch('guestCount')
    
    const watchRoomCount = watch('roomCount')
    
    const watchBathroomCount = watch('bathroomCount')

    const watchImageSrc = watch('imageSrc')

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

    if (step === STEPS.LOCATION) {
        
        bodyContent = (
            <div
                className={`
                    flex flex-col gap-8
                    text-white
                `}
                >
                <ModalHeading
                    title={"What is the location of this Business?"}
                    subtitle={"Help others find you on the map..."}
                />
                
                <div className="grid md:grid-cols-3 xl:grid-cols-3 grid-flow-row auto-rows-max z-50">
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
                        <Map
                            center={
                                watchCityinfo?.latitude && watchCityinfo?.longitude ? [watchCityinfo?.latitude, watchCityinfo?.longitude] :
                                //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
                                watchLocalinfo?.latitude && watchLocalinfo?.longitude ? [watchLocalinfo?.latitude, watchLocalinfo?.longitude] :
                                watchLocation?.latitude && watchLocation?.longitude ? [watchLocation?.latitude, watchLocation?.longitude] : [32.1652613142917, -54.72682487791673]
                            }
                        />
                </div>
            </div>
        )
    }

    // if (step === STEPS.STATSINFO) {
    //     {console.log('Line 173 location:', location)}
    //     {console.log('Line 174 location:', localinfo)}
    //     {console.log('Line 175 cityinfo:', cityinfo)}
    //     bodyContent = (
    //         <div
    //             className={`
    //                 flex flex-col gap-8
    //                 text-white
    //             `}
    //         >
    //             <Heading
    //                 title={"Business physical address?"}
    //                 subtitle={"Help others such as drivers and other customers visit you we will provide customers your directions..."}
    //             />
                
    //             <div className="position-relative px-2 col">
                    

    //             <Switch
    //                 posCnt={1}
    //                 title={'Is This Business A Franchise?'} 
    //                 subtitle={'Business owned by another parent company and/or apart of a chain of stores under a common parent company.'} 
    //                 onChange={(value) => setCustomValue('isAFranchise', value)}
    //                 checked={false}
    //             />
    //             <hr />
    //             <Switch 
    //                 posCnt={2}
    //                 title={'Is This Business A Corportate Business?'}
    //                 subtitle={'Parent company owns other businesses/stores?'}
    //                 onChange={(value) => setCustomValue('isTheFranchiseParent', value)} 
    //                 checked={false}                
    //             />
    //             <hr />
    //             <Switch 
    //                 posCnt={3}
    //                 title={'Does this business own any other businesses?'}
    //                 subtitle={'Owns other businesses/stores?'}
    //                 onChange={(value) => setCustomValue('ownsOtherBusinesses', value)} 
    //                 checked={false}                
    //             />
    //             <hr />
                    

                    
                    
                    
    //             </div>
    //             <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3'>
    //                     {/* <Map
    //                         center={
    //                             cityinfo?.latitude && cityinfo?.longitude ? [cityinfo?.latitude, cityinfo?.longitude] :
    //                             //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
    //                             localinfo?.latitude && localinfo?.longitude ? [localinfo?.latitude, localinfo?.longitude] :
    //                             location?.latitude && location?.longitude ? [location?.latitude, location?.longitude] : [32.1652613142917, -54.72682487791673]
    //                         }
    //                     /> */}
    //             </div>
    //         </div>
    //     )
    // }

    // if (step === STEPS.LOCALINFO) {
    //     {console.log('Line 173 location:', location)}
    //     {console.log('Line 174 location:', localinfo)}
    //     {console.log('Line 175 cityinfo:', cityinfo)}
    //     bodyContent = (
    //         <div
    //             className={`h-screen
    //                 flex flex-col gap-8
    //                 text-white
    //             `}
    //         >
    //             <Heading
    //                 title={"Business physical address?"}
    //                 subtitle={"Help others such as drivers and other customers visit you we will provide customers your directions..."}
    //             />
                
    //             <div className="position-relative px-2 col">
                    

                    
    
    //                 <div className='position-relative md:px-2 xl:px-2 mb-3'>
    //                     <h2 className='px-2'>Street Address1</h2>
    //                     <Input
    //                         id="streetAddress1"
    //                         label="Address1"
    //                         disabled={isLoading}
    //                         register={register}
    //                         errors={errors}
    //                         required
    //                         />
    //                 </div>

    //                 <div className='position-relative md:px-2 xl:px-2 mb-3'>
    //                     <h2 className='px-2'>Bldg/Suite/Apt#?</h2>
    //                     <Input
    //                         id="streetAddress2"
    //                         label="Address2"
    //                         disabled={isLoading}
    //                         register={register}
    //                         errors={errors}
    //                         required
    //                         />
    //                 </div>

    //                 <div className='position-relative md:px-2 xl:px-2 mb-3'>
    //                     <h2 className='px-2'>Zip/Postal Code</h2>
    //                     <Input
    //                         id="busPostalcode"
    //                         label="Postal Code"
    //                         disabled={isLoading}
    //                         register={register}
    //                         errors={errors}
    //                         required
    //                         />
    //                 </div>
                    
                    
    //             </div>
    //             <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3'>
    //                     {/* <Map
    //                         center={
    //                             cityinfo?.latitude && cityinfo?.longitude ? [cityinfo?.latitude, cityinfo?.longitude] :
    //                             //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
    //                             localinfo?.latitude && localinfo?.longitude ? [localinfo?.latitude, localinfo?.longitude] :
    //                             location?.latitude && location?.longitude ? [location?.latitude, location?.longitude] : [32.1652613142917, -54.72682487791673]
    //                         }
    //                     /> */}
    //             </div>
    //         </div>
    //     )
    // }



      
    return (
        <Modal
            isOpen={businessRegistrationModal.isOpen}
            onClose={businessRegistrationModal.onClose}
            //onSubmit={handleSubmit(onSubmit)}
            onSubmit={OnNext}
            actionLabel={actionLabel}
            title='Crate A Listing For My Business'
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default BusinessStoreResgistrationModal