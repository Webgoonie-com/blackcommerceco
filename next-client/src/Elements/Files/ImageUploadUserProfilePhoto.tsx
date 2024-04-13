"use client"

import Avatar from '@/Components/Avatar'
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@/Components/ui/button';
import { deleteAutoSaveProfilePhoto } from '@/ServiceCalls/callUsers';
import toast from 'react-hot-toast';

interface ImageUploadUserProfilePhotosProps {
    onChange: (images: string[]) => void;
    userId: string;
    currentUser: string;
    value: string[];
    selectedImages: string[];
    autoSaveToken: string;
}


const ImageUploadUserProfilePhoto: React.FC<ImageUploadUserProfilePhotosProps> = ({
    onChange,
    userId,
    currentUser,
    selectedImages: propSelectedImages,
    autoSaveToken,
}) => {

    const [selectedImages, setSelectedImages] = useState<string[]>(propSelectedImages);
    const [primaryPhoto, setPrimaryPhoto] = useState<boolean>(false);
    const imageRef = useRef<HTMLInputElement>(null);

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
            formData.append('token', autoSaveToken);


            try {
                

                // Send Photo To API
                const response = await axios.post(
                    //`${process.env.NEXT_PUBLIC_API_URL}/api/listings/createpropertyphotos`,
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/createUserProfilePhotos`,
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
                
            }



        }
            

    }, [userId, autoSaveToken, onChange, selectedImages]);

    const makePrimaryPhoto =  async (imageUrl: string) => {

      

        try {
            

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/makePrimaryPhoto/`, {
                primaryPhoto: imageUrl,
                autoSaveToken: autoSaveToken,
                
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

    const removeImage = async (imageUrl: string) => {



        try {
            // Call the API to delete the specific image
            await deleteAutoSaveProfilePhoto(imageUrl, autoSaveToken, userId);
            
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
            {!selectedImages || selectedImages.length === 0 ? (
                <div className="flex flex-col items-center text-center p-5 cursor-pointer border-indigo-300">
                    <Avatar sqPixels={400} />
                    <div onClick={() => imageRef.current?.click()} className="self-auto text-center font-semibold text-lg">
                        Click To Upload
                    </div>
                    <input id="myImage" type="file" multiple name="files[]" ref={imageRef} onChange={onImageChange} style={{ display: 'none' }} />
                </div>
            ) : (
                <div className="relative">
                    <div id="image-container" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-white">
                        {selectedImages.slice().reverse().map((image, index) => (
                            <div key={index} className="relative self-start p-2 ml-3">
                                {!primaryPhoto && (
                                    <IoMdClose
                                        size={18}
                                        className="absolute cursor-pointer z-50 text-white border-2 bg-red-600 border-red-100 rounded-full"
                                        onClick={() => removeImage(image)}
                                    />
                                )}
                                <Image
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    width={600}
                                    height={600}
                                    className="relative"
                                    style={{ objectFit: 'cover' }}
                                />
                                <Button className='w-full' onClick={() => makePrimaryPhoto(image)} disabled={primaryPhoto} variant={'primary'}>
                                    Make Primary Photo
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
    
}

export default ImageUploadUserProfilePhoto