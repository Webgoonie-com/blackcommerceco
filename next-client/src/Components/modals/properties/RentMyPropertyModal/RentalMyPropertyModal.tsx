"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from '@/Components/modals/Modal'




import useRentMyPropertyModal from '@/Hooks/useRentMyPropertyModal'
import ModalHeading from '../../ModalHeading';
import { categories } from '@/Components/navbar/categories/CategoriesProperties'
import CategoryInput from '@/Elements/Inputs/CategoryInput';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  LOCALINFO = 2,
  INFO = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

const RentMyPropertyModal = () => {

    const rentMyPropertyModalModal = useRentMyPropertyModal()

    const { data: session, status } = useSession();
    const currentUser = session?.user;

    const [step, setStep] = useState(STEPS.CATEGORY)
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
      title={"Rent My Property"}
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
                    {categories.map((item) => (

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
    <Modal
        isOpen={rentMyPropertyModalModal.isOpen}
        onClose={rentMyPropertyModalModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        title='List My Property As A Rental'
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
    />
  )
}

export default RentMyPropertyModal;