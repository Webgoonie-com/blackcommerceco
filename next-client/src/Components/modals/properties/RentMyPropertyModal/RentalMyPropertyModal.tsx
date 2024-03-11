"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from '@/Components/modals/Modal'

import useRentMyPropertyModal from '@/Hooks/useRentMyPropertyModal'

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
          
  
  

    try {

        // Calling Directly To Internal API Route
  
        
    } catch (error) {
        console.error(error);
    }

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

  return (
    <Modal
        isOpen={rentMyPropertyModalModal.isOpen}
        onClose={rentMyPropertyModalModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        title='List My Property As A Rental'
        // secondaryActionLabel={secondaryActionLabel}
        // secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        // body={bodyContent}
    />
  )
}

export default RentMyPropertyModal;