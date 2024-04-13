"use client"

import Avatar from '@/Components/Avatar'
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useState, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@/Components/ui/button';
import { deleteAutoSaveProfilePhoto } from '@/ServiceCalls/callUsers';
import toast from 'react-hot-toast';
import { User } from '@/Types';

interface ImageUploadUserProfilePhotosProps {
    onChange: (images: string[]) => void;
    userId: string;
    currentUser: User;
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

    const [uploding, setUploading] = useState<Boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [primaryPhoto, setPrimaryPhoto] = useState<boolean>(false);
    const imageRef = useRef<HTMLInputElement>(null);

    const onImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0]; // Get the first file
            setSelectedFile(file); // Set selectedFile to the file object
            
            const formData = new FormData();
            formData.append('files', file); // Append the file to the FormData
        
            formData.append('imageSrc', 'ImageUploadUserProfilePhoto');
            formData.append('imgUrl', `${process.env.NEXT_PUBLIC_API_URL}`);
            formData.append('imagesMultiSrc', 'ImageUploadMultiUserProfilePhoto');
            formData.append('imgName', 'UserProfilePhoto');
            formData.append('imgCatg', 'UserProfilePhoto');
            formData.append('userId', userId);
            formData.append('token', autoSaveToken);
    
            try {
                // Send Photo To API
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/createUserProfilePhotos`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
    
                console.log('response from api on userUploadProfilePhoto: ', response);
                console.log('response from api on userUploadProfilePhoto: ', response?.data.url);
    
                // Set selectedImage to the URL of the uploaded image
                setSelectedImage(response?.data.url);
                
                // Call the onChange callback with the updated images
                onChange([response?.data.url]);
                
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    }, [userId, autoSaveToken, onChange, setSelectedImage, setSelectedFile]);
    

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

    // const removeImage = async (imageUrl: string) => {



    //     try {
    //         // Call the API to delete the specific image
    //         await deleteAutoSaveProfilePhoto(imageUrl, autoSaveToken, userId);
            
    //         // Update the state to remove the deleted image
    //         setSelectedImages(prevImages => prevImages.filter(image => image !== imageUrl));
            
    //         // Call the onChange callback with the updated images
    //         onChange(selectedImages.filter(image => image !== imageUrl));
    //     } catch (error) {
    //         console.error('Error deleting image:', error);
    //     }
    // };

    return (
        <>
            {selectedImage ? (
                <div className="relative">
                    <div className="relative flex flex-col items-center p-2">
                        <div className="absolute top-0 left-32">
                            <IoMdClose
                                size={18}
                                className="absolute cursor-pointer z-50 text-white border-2 bg-red-600 border-red-100 rounded-full"
                                //onClick={() => removeImage(image)}
                            />
                        </div>
                         <div className="mx-auto">
                            <Image
                                src={selectedImage}
                                alt={`User Profile Photo`}
                                width={600}
                                height={600}
                                className="relative"
                                style={{ width: '600px', height: 'auto' }}
                            />
                            
                        </div>
                       
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center p-5 cursor-pointer border-indigo-300">
                    <Avatar sqPixels={400} />
                    <div onClick={() => imageRef.current?.click()} className="self-auto text-center font-semibold text-lg">
                        Click To Upload - selectedImage: {selectedFile?.name}
                    </div>
                    <input id="myImage" type="file" multiple name="files" ref={imageRef} onChange={onImageChange} style={{ display: 'none' }} />
                </div>
            )}
        </>
    );
    
    
}

export default ImageUploadUserProfilePhoto