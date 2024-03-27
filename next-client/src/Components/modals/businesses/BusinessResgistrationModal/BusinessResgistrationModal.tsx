"use client"

import React, { useMemo, useState } from 'react'
import { useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from '@/Components/modals/Modal'

import useBusinessRegistrationModal from '@/Hooks/useBusinessRegistrationModal'

import ModalHeading from '../../ModalHeading';

import { businessesCategories } from '@/Components/navbar/navcategories/CategoriesBusinesses'

import CategoryInput from '@/Elements/Inputs/CategoryInput';

import Input from '@/Elements/Inputs/Input';

import SelectCountry from '@/Elements/Selects/SelectCountry';
import SelectStateRegion from '@/Elements/Selects/SelectStateRegion';
import SelectCityByRegion from '@/Elements/Selects/SelectCityByRegion';
import dynamic from 'next/dynamic';
import Switch from '@/Elements/Switches/Switch';
import { User } from 'next-auth';
import ImageUploadBusinessPhotos from '@/Elements/Files/ImageUploadBusinessPhotos';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { callBusinesses, autoSaveBusinessData } from '@/ServiceCalls/callBusinesses';

import { useRouter } from 'next/navigation';

// import  Map from "@/Components/maps/Map";  // We dynamically loop the map on ssr

enum STEPS {
    CATEGORY = 0,
    STATSINFO = 1,
    LOCATION = 2,
   
    LOCALINFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
}

interface BusinessStoreResgistrationModalProps {
    currentUser?: User | null;
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

const BusinessStoreResgistrationModal: React.FC<BusinessStoreResgistrationModalProps> = ({currentUser}) => {
    
    const router = useRouter()
    
    const businessRegistrationModal = useBusinessRegistrationModal()

    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const [autoSaveToken, setAutoSaveToken] = useState<string>(makeToken(20));

    const [step, setStep] = useState(STEPS.CATEGORY)

    
    const [businessId, setBusinessId] = useState<number>(0)

    const [listingId, setListingId] = useState<number>(0)

    const [userId, setUserId] = useState<number>(parseInt(currentUser?.id as string))

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
            listingId: listingId,
            category: '',
            countryCity: null,
            country: null,
            countryStateRegion: null,
            cityinfo: null,
            isAFranchise: null,
            isTheFranchiseParent: null,
            ownsOtherBusinesses: null,
            exactBusinessGeoLocation: [],
            hasStore: 1,
            hasProducts: 1,
            hasServices: 1,
            imageSrc: [],
            streetAddress: '',
            streetAddress2: '',
            streetCity: '',
            streetZipCode: '',
            token: autoSaveToken,
            userId: currentUser?.id,
            description: '',
            title: '',
            businessId: businessId,
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

    const watchImageSrc = watch('imageSrc')

    

   

   
    const  Map = useMemo(() => dynamic(() => import("@/Components/maps/Map"), {
        ssr: false
    }), [])

    const onSwitchChange = (id: string, value: any) => {
        console.log('onSwitchChange id: ', id)
        console.log('onSwitchChange value: ', value)
        setCustomValue(id, value); // Update the value in the parent component
    };

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

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onChangeImages = (images: string[]) => {
        //console.log('onParent component onChangeImages in Effect ' + images)
        setCustomValue('imageSrc', images);
        setSelectedImages(images);
    };


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
            
    
        console.log('DATA: on onSubmit: ', data)

        
        if(step === STEPS.CATEGORY){
            return onNext()
        }else{
            
                try {
        
                    // Calling Directly To Internal API Route
        
                    const responseData = await autoSaveBusinessData(data, autoSaveToken, userId); // Call the autoSaveBusinessData function
                    // Your other submission logic
        
                    console.log('responseData: ', responseData)
        
                    const { id, listingId } = responseData;
        
                    //console.log('propertyId: id -', id)
                    //console.log('propertyId: listingId -', listingId)
        
                    setBusinessId(id)
                    setListingId(listingId)
                    setCustomValue('', id)
            
                    
                } catch (error) {
                    console.error(error);
                }
        }


        if(step !== STEPS.DESCRIPTION){
            return onNext()
        }


        setIsLoading(true)


        try {

            // Calling Directly To Internal API Route

            await axios.post(`
                ${process.env.NEXT_PUBLIC_API_URL}/api/businesses/createBusiness`,
                data
            ).then(() =>{
                toast.success('Congratulations Your Listing was Just Created!', {
                    duration: 7000,
                    position: 'bottom-right',
                })
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                businessRegistrationModal.onClose()
            })
            .catch(() => {
                toast.error('Sorry Something went Wrong');
            }).finally(() => {
                setIsLoading(false)
            })

    
            
        } catch (error) {
            console.error(error);
        }

        if(step !== STEPS.DESCRIPTION){
            return onNext()
        }


    


       


    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.DESCRIPTION){
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
                    
                    {businessesCategories.map((item) => (

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

   

    if (step === STEPS.STATSINFO) {

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
                            mapCenterReasonTxt={"The Location Of Your Business"}
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
    
    if (step === STEPS.LOCATION) {
        
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
                            mapCenterReasonTxt={"Your Business Market Area"}
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
                            id="streetAddress"
                            label="Street Address"
                            type={"string"}
                            value={watchStreetAddress}
                            onChange={(value) => setCustomValue('streetAddress', value)}
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            />
                    </div>

                    <div className='position-relative md:px-2 xl:px-2 mb-3'>
                        <h2 className='px-2'>Bldg/Suite/Unit/Floor#?</h2>
                        <Input
                            id="streetAddress2"
                            label="Address2"
                            type={"string"}
                            value={watchStreetAddress2}
                            onChange={(value) => setCustomValue('streetAddress2', value)}
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            
                            />
                    </div>

                    <div className='position-relative md:px-2 xl:px-2 mb-3'>
                        <h2 className='px-2'>City or Town</h2>

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

                     </div>

                    <div className='position-relative md:px-2 xl:px-2 mb-3'>
                        <h2 className='px-2'>Zip/Postal Code</h2>
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
                    
                    
                </div>
                <div className='relative md:w-full xl:w-full md:px-2 xl:px-2 mb-3'>
                        <Map
                            mapCenterReasonTxt={'Your Business Address is about here....'}
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
   
    if (step === STEPS.IMAGES){
        bodyContent = (
            <div
                className="text-white flex flex-col gap-8"
            >
                <ModalHeading
                    title={"Add a photo of your place"}
                    subtitle={"Show guests what your place looks like!"}
                />

                <ImageUploadBusinessPhotos
                    value={watchImageSrc as any}
                    //onChange={(value) => setCustomValue('imageSrc', value)} 
                    autoSaveToken={autoSaveToken}
                    onChange={onChangeImages}
                    userId={'' + currentUser?.id}
                    selectedImages={selectedImages}
                    currentUser={currentUser as any}                
                    businessId={businessId}
                    listingId={listingId}
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
                    title="What are the highlights of your businesess?"
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