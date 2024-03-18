"use client"

import React, { useEffect, useMemo, useState } from 'react'
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
import dynamic from 'next/dynamic';
import Counter from '@/Elements/Counters/Counter';

import ImageUploadProperty from '@/Elements/Files/ImageUploadPropertyPhotos'

import axios from 'axios';
import axiosWithCredentials from '@/lib/axiosWithCredentials'; // Doesn't Work For Post to API Says Cors Error.

import { User } from "next-auth"
import getCurrentUser from '@/Actions/getCurrentUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { callPropertys, autoSavePropertyData } from '@/ServiceCalls/callPropertys';



enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  LOCALINFO = 2,
  INFO = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

const makeToken = (length: number)  => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

interface RentMyPropertyModalProps {
    currentUser?: User | null;
}

const RentMyPropertyModal: React.FC<RentMyPropertyModalProps> = ({currentUser}) => {

        

        // const generateTokenToSave = makeToken(20)

        // console.log('Business Make Id: ', generateTokenToSave);

    
        const router = useRouter()


        const rentMyPropertyModalModal = useRentMyPropertyModal();

        const [selectedImages, setSelectedImages] = useState<string[]>([]);
      
        const [autoSaveToken, setAutoSaveToken] = useState<string>();

        const [step, setStep] = useState(STEPS.CATEGORY)

        const [isLoading, setIsLoading] = useState(false)
  
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
                bathroomCount: 1,
                category: '',
                countryCity: null,
                description: '',
                guestCount: 1,
                imageSrc: [],
                countryStateRegion: null,
                country: null,
                price: 10.00,
                roomCount: 1,
                streetAddress: '',
                streetAddress2: '',
                streetCity: '',
                streetZipCode: '',
                title: '',
                town: null,
                token: autoSaveToken,
                userId: currentUser?.id,
            }
        })
    

    // A work around for selected register in useform
    const watchCategory = watch('category')

    const watchCountry = watch('country')
 
    const watchCountryStateRegion  = watch('countryStateRegion')

    const watchCountryCity  = watch('countryCity')

    const watchStreetAddress  = watch('streetAddress')
    const watchStreetAddress2  = watch('streetAddress2')
    const watchStreetCity  = watch('streetCity')
    const watchStreetZipCode  = watch('streetZipCode')
    

    const watchGuestCount = watch('guestCount')
    
    const watchRoomCount = watch('roomCount')
      
    const watchBathroomCount = watch('bathroomCount')
  
    const watchImageSrc = watch('imageSrc')
 
      
 
 
    //const imageSrc = watch('imageSrc')

    async function  handleAutoSave(){

       // await callPropertys.autoSavePropertyData(data)

    };

    

    const  Map = useMemo(() => dynamic(() => import("@/Components/maps/Map"), {
        ssr: false
    }), [])

    const setCustomValue = (id: string, value: any) => {
        console.log('setCustomValue id: ', id)
        console.log('setCustomValue value: ', value)
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

    const onChangeImages = (images: string[]) => {
        console.log('onParent component onChangeImages in Effect ' + images)
        setCustomValue('watchImageSrc', images);
        setSelectedImages(images);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {


        try {
            await autoSavePropertyData(data, autoSaveToken); // Call the autoSavePropertyData function
            // Your other submission logic
        } catch (error) {
            console.error('Error occurred while submitting data:', error);
        }


        if(step !== STEPS.PRICE){
            return onNext()
        }

        console.log('Line 137 OnSubmit', data)



        setIsLoading(true)

        
        try {
            
            // Calling Directly To Internal API Route
            
           await axios.post(`
                ${process.env.NEXT_PUBLIC_API_URL}/api/propertys/createProperty`,
                data
            ).then(() =>{
                toast.success('Listing Crated!')
                //router.refresh()
                //reset()
                //setStep(STEPS.CATEGORY)
                //rentMyPropertyModalModal.onClose()
            })
            .catch(() => {
                toast.error('Sorry Something went Wrong');
            }).finally(() => {
                setIsLoading(false)
            })

            
      
            
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
                              //countryCity?.Latitude && countryCity?.Longitude ? [countryCity?.Latitude, countryCity?.Longitude] :
                              watchCountryStateRegion?.latitude && watchCountryStateRegion?.longitude ? [watchCountryStateRegion?.latitude, watchCountryStateRegion?.longitude] :
                              watchCountry?.latitude && watchCountry?.longitude ? [watchCountry?.latitude, watchCountry?.longitude] : [32.1652613142917, -54.72682487791673]
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
                  title={"What is the address to this property?"}
                  subtitle={"Help guest find you!"}
              />
              <div className="grid md:grid-cols-3 xl:grid-cols-3 grid-flow-row auto-rows-max z-50">
                  
              <Input 
                    id="streetAddress"
                    label="Street Address"
                    type="string"
                    value={watchStreetAddress}
                    onChange={(value) => setCustomValue('streetAddress', value)}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

              {/* <Input 
                    id="streetAddress"
                    label="Street Address 2"
                    type="string"
                    value={watchStreetAddress2}
                    onChange={(value) => setCustomValue('streetAddress2', value)}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                /> */}
                
              

              <Input 
                    id="streetCity"
                    label="City or Town"
                    type="string"
                    value={watchStreetCity}
                    onChange={(value) => setCustomValue('streetCity', value)}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    
                    required
                />
              <Input 
                    id="streetZipCode"
                    label="Postal Code"
                    type="string"
                    value={watchStreetZipCode}
                    onChange={(value) => setCustomValue('streetZipCode', value)}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                
              </div>
             
              <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3'>
                        <Map
                          center={
                              watchCountryCity?.latitude && watchCountryCity?.longitude ? [watchCountryCity?.latitude, watchCountryCity?.longitude] :
                              watchCountryStateRegion?.latitude && watchCountryStateRegion?.longitude ? [watchCountryStateRegion?.latitude, watchCountryStateRegion?.longitude] :
                              watchCountry?.latitude && watchCountry?.longitude ? [watchCountry?.latitude, watchCountry?.longitude] : [32.1652613142917, -54.72682487791673]
                          }
                        />
              </div>
          </div>
      )
  }

    if (step === STEPS.INFO){
        bodyContent = (
            <div
                className={`flex flex-col gap-8 text-white`}
            >
                <ModalHeading 
                    title={"Share Some basics about your place"}
                    subtitle={"What amentities does this propery have?"}
                />
                <Counter
                    title={'Guests'} 
                    subtitle={"How many Guest are allowed at this property?"}
                    value={watchGuestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter 
                    title={'Rooms'} 
                    subtitle={"How many Rooms does this property have?"}
                    value={watchRoomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter 
                    title={'Bathroom'} 
                    subtitle={"How many Bathrooms does this property have?"}
                    value={watchBathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
                <hr />
                
                
            </div>
        )



    }

    if (step === STEPS.IMAGES){
        bodyContent = (
            <div
                className="text-white flex flex-col gap-8"
            >
                <ModalHeading
                    title={"Add a photo of your place"}
                    subtitle={"Show guests what your place looks like!"}
                />

                <ImageUploadProperty
                    value={watchImageSrc as any}
                    //onChange={(value) => setCustomValue('imageSrc', value)} 
                    onChange={onChangeImages}
                    userId={'' + currentUser?.id}
                    selectedImages={selectedImages}
                    currentUser={currentUser as any}                
                />

                {/* <ImageUpload
                    dirs={[]}
                    value={imagesSrc}
                    onChange={(value) => setCustomValue('imagesSrc', value)}
                /> */}
            </div>
        )

    }

    if (step === STEPS.DESCRIPTION){
        bodyContent = (
            <div
                className="flex flex-col gap-8"
            >
                <ModalHeading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />

                
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                <hr />

                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                
            </div>
        )
    }

    if(step === STEPS.PRICE) {
        bodyContent = (
            <div
                className="flex flex-col gap-8"
            >
                <ModalHeading
                    title="Now, Set Your Daily/Nightly Price"
                    subtitle="How Much do you charge per night?"
                />

                <Input 
                    id="price"
                    label="Price"
                    formatPrice={true}
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }


    useEffect(() => {
        // Generate token only once during the initial load
        const token = makeToken(20);
        setAutoSaveToken(token);
      }, []);

    return (
      <Modal
          isOpen={rentMyPropertyModalModal.isOpen}
          onClose={rentMyPropertyModalModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          //onSubmit={onNext}
          actionLabel={actionLabel}
          title='List My Property As A Rental'
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
          body={bodyContent}
      />
    )
}

export default RentMyPropertyModal;