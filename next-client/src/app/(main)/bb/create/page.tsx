"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';


import { businesses } from '@/Components/navbar/categories/CategoriesBusinesses'
import ModalHeading from '@/Components/modals/ModalHeading';

import CategoryInput from '@/Elements/Inputs/CategoryInput';

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
        <div className='bg-slate-500 vh h-screen'>
            
            <h2>Business Creation</h2>

            <p>Create a new business listing here</p>

            <p>{currentUser?.firstName} {currentUser?.lastName}</p>

            {bodyContent}
        </div>
    )
}

export default BusinessCreation