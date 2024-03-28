
"use client"

import { Button } from '@/Components/ui/button';
import { deleteAutoSaveBusinessPhoto } from '@/ServiceCalls/callBusinessPhotos';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { TbPhotoPlus } from 'react-icons/tb';


interface ImageUploadBusinessPhotosProps {
    onChange: (images: string[]) => void;
    userId: string;
    currentUser: string;
    value: string[];
    businessId: number;
    listingId: number;
    selectedImages: string[];
    autoSaveToken: string;
}

const ImageUploadBusinessPhotos: React.FC<ImageUploadBusinessPhotosProps> = ({
    onChange,
    userId,
    currentUser,
    selectedImages: propSelectedImages,
    autoSaveToken,
    businessId,
    listingId: propsListingId,
}) => {

    const [selectedImages, setSelectedImages] = useState<string[]>(propSelectedImages);
    const [primaryPhoto, setPrimaryPhoto] = useState<boolean>(false);
    const imageRef = useRef<HTMLInputElement>(null);

    const makePrimaryPhoto =  async (imageUrl: string) => {

      

        try {
            

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/makePrimaryPhoto/`+propsListingId, {
                primaryPhoto: imageUrl,
                autoSaveToken: autoSaveToken,
                businessId: businessId,
                listingId: propsListingId
              })
              .then(() => {

                setPrimaryPhoto(!primaryPhoto);
                
                toast.success('Primary Photo Set', {
                    duration: 7000,
                    position: 'bottom-right',
                })
              })
              .catch(function (error) {
                console.log(error);
              });

               
              
        } catch (error) {
            console.log('Error on Setting Primary Photo')
        }

    }


    const onImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const formData = new FormData();
    
            files.forEach(file => {
                formData.append('files', file as any); // Append each file to the FormData
            });
    
            formData.append('imageSrc', 'ImageUploadBusinessPhotos');
            formData.append('imgUrl', `${process.env.NEXT_PUBLIC_API_URL}`);
            formData.append('imagesMultiSrc', 'ImageUploadMultiBusinessPhotos');
            formData.append('imgName', 'BusinessPhoto');
            formData.append('imgCatg', 'Business');
            formData.append('userId', userId);
            formData.append('token', autoSaveToken); // Convert array to string
            formData.append('businessId', String(businessId));
            formData.append('listingId', String(propsListingId))
    
            try {
                const response = await axios.post(
                    //`${process.env.NEXT_PUBLIC_API_URL}/api/listings/createpropertyphotos`,
                    `${process.env.NEXT_PUBLIC_API_URL}/api/businesses/createbusinessphotos`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
    
                const newImages = response.data.map((image: any) => image.imgUrl); // Extract the URLs
    
                // Update state using the setter function
                setSelectedImages(prevImages => [...prevImages, ...newImages]);
    
                // Call the onChange callback with the updated images
                onChange([...selectedImages, ...newImages]);
    
            } catch (error) {
                console.error('Error uploading images', error);
            }
        }
    }, [userId, autoSaveToken, businessId, propsListingId, onChange, selectedImages]);
    

    const removeImage = async (imageUrl: string) => {



        try {
            // Call the API to delete the specific image
            await deleteAutoSaveBusinessPhoto(imageUrl, autoSaveToken, userId);
            
            // Update the state to remove the deleted image
            setSelectedImages(prevImages => prevImages.filter(image => image !== imageUrl));
            
            // Call the onChange callback with the updated images
            onChange(selectedImages.filter(image => image !== imageUrl));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <>
            <div>
                <h2>Upload Images Of This Property</h2>

                <div className="relative cursor-pointer">
                    {!selectedImages || selectedImages.length === 0 && (
                        <div
                            onClick={() => imageRef.current?.click()}
                            className="cursor-pointer relative hover:opacity-70 transition border-dashed border-2 border-indigo-300 flex flex-col justify-center items-center text-white"
                        >
                            <div
                                className="
                                    text-center
                                    relative
                                    cursor-pointer
                                    hover:opacity-70
                                    transition
                                    p-20
                                    border-indigo-300
                                    flex
                                    flex-col
                                    items-center
                                    text-white
                                "
                            >
                                <TbPhotoPlus size={72} />
                                <div className="self-auto text-center font-semibold text-lg">
                                    Click To Upload
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                <div id="image-container" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-white">
                    {selectedImages.slice().reverse().map((image, index) => (
                            <div key={index} className="relative self-start p-2 ml-3">
                                {!primaryPhoto ? (
                                      <IoMdClose
                                      size={18}
                                      className="absolute cursor-pointer z-50 text-white border-2 bg-red-600 border-red-100 rounded-full"
                                      onClick={() => removeImage(image)}
                                        />
                                 ) : null }
                                <Image
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    width={600}
                                    height={600}
                                    className="relative"
                                    style={{ objectFit: 'cover' }}
                                />
                                <Button className='w-full' onClick={() => makePrimaryPhoto(image)} disabled={primaryPhoto} variant={'primary'}>Make Primary Photo</Button>
                            </div>
                        ))}
                    </div>
                    
                    
                </div>


                
                    <input id="myImage" type="file" multiple name="files[]" ref={imageRef} onChange={onImageChange} style={{ display: 'none' }} />
    
                    
    
                
            </div>
        </>
    );
};

export default ImageUploadBusinessPhotos;