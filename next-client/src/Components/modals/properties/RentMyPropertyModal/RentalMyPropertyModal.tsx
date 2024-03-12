"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from '@/Components/modals/Modal'

import useRentMyPropertyModal from '@/Hooks/useRentMyPropertyModal'

import ModalHeading from '../../ModalHeading';

import { categories } from '@/Components/navbar/categories/CategoriesProperties'

import CategoryInput from '@/Elements/Inputs/CategoryInput';

import Input from '@/Elements/Inputs/Input';

import SelectCountry from '@/Elements/Selects/SelectCountry';
import SelectStateRegion from '@/Elements/Selects/SelectStateRegion';
import SelectCityByRegion from '@/Elements/Selects/SelectCityByRegion';
import CountrySelect from '@/Elements/Selects/CountrySelect';

import  Map from "@/Components/maps/Map";  // We dynamically loop the map on ssr

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
    

      // A work around for selected register in useform
      const watchCategory = watch('category')

      const watchLocation = watch('location')
 
      const watchLocalinfo  = watch('localinfo')
 
      const watchNewStateCodeInfo  = watch('newStateCodeInfo')
 
      const watchCityinfo  = watch('cityinfo')
     
      const watchIsAFranchise  = watch('isAFranchise')

      const watchIsTheFranchiseParent  = watch('isTheFranchiseParent')

      const watchOwnsOtherBusinesses  = watch('ownsOtherBusinesses')
 
 
      const imageSrc = watch('imageSrc')

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

    // Begin Steps

    if (step === STEPS.LOCATION){
      bodyContent = (
          <div
              className={`
                  flex flex-col gap-8
                  text-white
              `}
          >
              <ModalHeading 
                  title={"Where is your place located?"}
                  subtitle={"Help guest find you!"}
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

  if (step === STEPS.LOCALINFO){
      bodyContent = (
          <div
              className={`
                  flex flex-col gap-8
                  text-white
              `}
          >
              <ModalHeading 
                  title={"What City In Or Closest To?"}
                  subtitle={"Help guest find you!"}
              />
              <CountrySelect
                  value={watchLocation}
                  onChange={(value) => setCustomValue('location', value)}
              />
              {/* <CitySelect onChange={function (value: CitySelectValue): void {
                  throw new Error('Function not implemented.');
              } }                
              /> */}
              {/* <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3'>
                      <Map
                          center={
                              cityinfo?.latitude && cityinfo?.longitude ? [cityinfo?.latitude, cityinfo?.longitude] :
                              //cityinfo?.Latitude && cityinfo?.Longitude ? [cityinfo?.Latitude, cityinfo?.Longitude] :
                              localinfo?.latitude && localinfo?.longitude ? [localinfo?.latitude, localinfo?.longitude] :
                              location?.latitude && location?.longitude ? [location?.latitude, location?.longitude] : [32.1652613142917, -54.72682487791673]
                          }
                      />
              </div> */}
          </div>
      )
  }

    // if (step === STEPS.INFO){
    //     bodyContent = (
    //         <div
    //             className={`flex flex-col gap-8 text-white`}
    //         >
    //             <Heading 
    //                 title={"Share Some basics about your place"}
    //                 subtitle={"What amentities does this propery have?"}
    //             />
    //             <Counter 
    //                 title={'Guests'} 
    //                 subtitle={"How many guest do you allow?"}
    //                 value={guestCount}
    //                 onChange={(value) => setCustomValue('guestCount', value)}
    //             />
    //             <hr />
    //             <Counter 
    //                 title={'Rooms'} 
    //                 subtitle={"How many rooms do you have?"}
    //                 value={roomCount}
    //                 onChange={(value) => setCustomValue('roomCount', value)}
    //             />
    //             <hr />
    //             <Counter 
    //                 title={'Bathroom'} 
    //                 subtitle={"How many bathrooms do you have?"}
    //                 value={bathroomCount}
    //                 onChange={(value) => setCustomValue('bathroomCount', value)}
    //             />
    //             <hr />
                
                
    //         </div>
    //     )



    // }

    // if (step === STEPS.IMAGES){
    //     bodyContent = (
    //         <div
    //             className="text-white flex flex-col gap-8"
    //         >
    //             <Heading
    //                 title={"Add a photo of your place"}
    //                 subtitle={"Show guests what your place looks like!"}
    //             />

    //             <ImageUploadProperty 
    //                 value={imageSrc}
    //                 onChange={(value) => setCustomValue('imageSrc', value)} 
    //                 userId={''+userId} 
    //                 currentUser={''+currentUser}                    
    //             />

    //             {/* <ImageUpload
    //                 dirs={[]}
    //                 value={imagesSrc}
    //                 onChange={(value) => setCustomValue('imagesSrc', value)}
    //             /> */}
    //         </div>
    //     )

    // }

    // if (step === STEPS.DESCRIPTION){
    //     bodyContent = (
    //         <div
    //             className="flex flex-col gap-8"
    //         >
    //             <Heading
    //                 title="How would you describe your place?"
    //                 subtitle="Short and sweet works best!"
    //             />

                
    //             <Input
    //                 id="title"
    //                 label="Title"
    //                 disabled={isLoading}
    //                 register={register}
    //                 errors={errors}
    //                 required
    //             />

    //             <hr />

    //             <Input
    //                 id="description"
    //                 label="Description"
    //                 disabled={isLoading}
    //                 register={register}
    //                 errors={errors}
    //                 required
    //             />

                
    //         </div>
    //     )
    // }

    // if(step === STEPS.PRICE) {
    //     bodyContent = (
    //         <div
    //             className="flex flex-col gap-8"
    //         >
    //             <Heading
    //                 title="Now, Set Your Daily/Nightly Price"
    //                 subtitle="How Much do you charge per night?"
    //             />

    //             <Input 
    //                 id="price"
    //                 label="Price"
    //                 formatPrice={true}
    //                 type="number"
    //                 disabled={isLoading}
    //                 register={register}
    //                 errors={errors}
    //                 required
    //             />

    //         </div>
    //     )
    // }

    return (
      <Modal
          isOpen={rentMyPropertyModalModal.isOpen}
          onClose={rentMyPropertyModalModal.onClose}
          //onSubmit={handleSubmit(onSubmit)}
          onSubmit={OnNext}
          actionLabel={actionLabel}
          title='List My Property As A Rental'
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
          body={bodyContent}
      />
    )
}

export default RentMyPropertyModal;