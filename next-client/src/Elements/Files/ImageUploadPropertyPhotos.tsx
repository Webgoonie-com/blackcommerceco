"use client"

import { Button } from '@/Components/ui/button';
import axiosWithCredentials from '@/lib/axiosWithCredentials';
import { deletePropertyPhoto } from '@/ServiceCalls/callPropertyPhotos';
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TbPhotoPlus } from 'react-icons/tb';


interface ImageUploadPropertyPhotosProps {
    onChange: (images: string[]) => void;
    userId: string;
    currentUser: string;
    value: string[];
    propertyId: number;
    listingId: number;
    selectedImages: string[];
    autoSaveToken: string;
}

const ImageUploadPropertyPhotos: React.FC<ImageUploadPropertyPhotosProps> = ({
    onChange,
    userId,
    currentUser,
    selectedImages: propSelectedImages,
    autoSaveToken,
    propertyId,
    listingId: propsListingId,
}) => {

    console.log('Line 30: currentUser', currentUser)
    console.log('Line 31: userId', userId)
    console.log('Line 32: propertyId', propertyId)
    console.log('Line 33: propsListingId', propsListingId)


    const [selectedImages, setSelectedImages] = useState<string[]>(propSelectedImages);
    const [primaryPhoto, setPrimaryPhoto] = useState<boolean>(false);

    const imageRef = useRef<HTMLInputElement>(null);



    const makePrimaryPhoto = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('MakePrimary Photos', event);
        setPrimaryPhoto(!primaryPhoto);
    }

    const onImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files) {
            const files = Array.from(event.target.files);
            const formData = new FormData();
    
            files.forEach(file => {
                formData.append('files', file as any); // Append each file to the FormData
            });
    
            formData.append('imageSrc', 'ImageUploadPropertyPhotos');
            formData.append('imagesMultiSrc', 'ImageUploadMultiPropertyPhotos');
            formData.append('imgUrl', `${process.env.NEXT_PUBLIC_API_URL}`);
            formData.append('imgName', 'PropertyPhoto');
            formData.append('imgCatg', 'Property');
            formData.append('userId', userId);
            formData.append('token', autoSaveToken);                            // Convert array to string
            formData.append('propertyId', String(propertyId));
    
            try {
                const response = await axios.post(
                    
                    //`${process.env.NEXT_PUBLIC_API_URL}/api/propertys/createpropertyphotos`,

                    `${process.env.NEXT_PUBLIC_API_URL}/api/listings/createpropertyphotos`,

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

    }, [autoSaveToken, onChange, propertyId, selectedImages, userId]);
    
    

    const removeImage = async (index: number) => {

                console.log('Updated index: ', index);

                const updatedImages = [...selectedImages];
                updatedImages.splice(index, 1);
                
                console.log('Updated index: ', index);
                console.log('Updated Images: ', updatedImages);
        

        

        // Pass the command to API Move to top after tested and retuns success or failure.
        try {

            // const response = await axios.post(
                
            //     //`${process.env.NEXT_PUBLIC_API_URL}/api/propertys/createpropertyphotos`,

            //     `${process.env.NEXT_PUBLIC_API_URL}/api/propertys/deletePropertyPhoto/:`+autoSaveToken, {
            //         updatedImages,
            //         autoSaveToken,
            //         userId,


            //     }

            // );

            //console.log('Line 122 = response: ', response);

            await deletePropertyPhoto(
                        updatedImages,
                        autoSaveToken,
                        userId
            )

            
        } catch (error) {
            console.log('Line 128 = error: ', error);
        }



        // setSelectedImages(prevImages => {
        //     const updatedImages = [...prevImages];
        //     updatedImages.splice(index, 1);
        //     return updatedImages;
        // });
    
        // // // Call the onChange callback with the updated images
        // onChange(selectedImages.filter((_, i) => i !== index));


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
                    <div id="image-container" className="relative hover:opacity-70 transition border-dashed border-2 border-indigo-300 flex flex-row self-start items-start text-white">
                        {selectedImages.slice().reverse().map((image, index) => (
                            <div key={index} className="relative self-start p-2 ml-3">
                                <IoMdClose
                                    size={18}
                                    className="absolute cursor-pointer z-50 text-white border-2 bg-red-600 border-red-100 rounded-full"
                                    onClick={() => removeImage(index)}
                                />
                                <Image
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    width={600}
                                    height={600}
                                    className="relative"
                                    style={{ objectFit: 'cover' }}
                                />
                                <Button className='w-full' onClick={makePrimaryPhoto} disabled={primaryPhoto} variant={'primary'}>Make Primary Photo</Button>
                            </div>
                        ))}
                    </div>
                    
                    
                </div>


                
                    <input id="myImage" type="file" multiple name="files[]" ref={imageRef} onChange={onImageChange} style={{ display: 'none' }} />
    
                    
    
                
            </div>
        </>
    );
};

export default ImageUploadPropertyPhotos;