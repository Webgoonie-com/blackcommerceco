"use client"

import Avatar from '@/Components/Avatar'
import axios from 'axios';
import Image from 'next/image';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@/Components/ui/button';
import { deleteAutoSaveProfilePhoto } from '@/ServiceCalls/callUsers';
import toast from 'react-hot-toast';
import { User } from '@/Types';

import { useSession } from 'next-auth/react'

interface ImageUploadUserProfilePhotosProps {
    onChange: (images: string[]) => void;
    userId: string;
    currentUser: User;
    value: string[];
    selectedImage: string[];
    autoSaveToken: string;
    propSelectedImage: string;
}


const ImageUploadUserProfilePhoto: React.FC<ImageUploadUserProfilePhotosProps> = ({
    onChange,
    userId,
    currentUser,
    selectedImage: propSelectedImage,
    autoSaveToken,
}) => {

    const [isUploading, setIsUploading] = useState(false);

    const [uploding, setUploading] = useState<Boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [primaryPhoto, setPrimaryPhoto] = useState<boolean>(false);
    const imageRef = useRef<HTMLInputElement>(null);


    const {data: session, update } = useSession()

    const updateUserPhotoSession = useCallback(async (imageUrl: string) => {
        
        console.log('running updateUserPhotoSession')

        if (session && session.user) {  
            try {
                // Update the session state asynchronously
                await update({
                    ...session,
                    user: {
                        ...session.user,
                        image: imageUrl,
                    },
                });
            } catch (error) {
                console.error('Error updating user photo session:', error);
            }
        }
    }, [session, update]);

    const removoeUserPhotoSession = useCallback(async () => {
        
        console.log('running updateUserPhotoSession')

        if (session && session.user) {  
            try {
                // Update the session state asynchronously
                await update({
                    ...session,
                    user: {
                        ...session.user,
                        image: '',
                    },
                });
            } catch (error) {
                console.error('Error updating user photo session:', error);
            }
        }
    }, [session, update]);



    const onImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log('Say this is the session: ', { session })


        if (!isUploading && event.target.files) {
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
            } finally {
                setIsUploading(false); // Reset uploading status
            }
        }
    }, [session, isUploading, userId, autoSaveToken, onChange]);
    

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

    const removeImage = async () => {
        try {
            // Call the API to delete the specific image
            await deleteAutoSaveProfilePhoto(selectedImage, autoSaveToken, userId);
            
            // Update the state to remove the deleted image
            setSelectedImage("");

            if(session && selectedImage === session.user?.image){
                console.log('Both session And Selected Image Match so remove from session')
                removoeUserPhotoSession()
            }
            
            // Call the onChange callback with the updated images
            onChange([]);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };


    useEffect(() => {
        console.log('running useEffect')
        // Check if selectedImage is not empty and session is available
        if (selectedImage && session) {
            updateUserPhotoSession(selectedImage);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);


    return (
        <>
            {selectedImage ? (
                <div className="relative">
                    <div className="relative flex flex-col items-center p-2">
                        <div className="absolute top-0 left-32">
                            <IoMdClose
                                size={18}
                                className="absolute cursor-pointer z-50 text-white border-2 bg-red-600 border-red-100 rounded-full"
                                onClick={removeImage}
                            />
                        </div>
                         <div className="mx-auto">
                            <Image
                                src={selectedImage}
                                alt={`User Profile Photo`}
                                width={200}
                                height={200}
                                className="relative"
                                style={{ width: '200px', height: 'auto' }}
                            />
                            
                        </div>
                       
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center p-5 cursor-pointer border-indigo-300">
                    <span  onClick={() => imageRef.current?.click()}> 
                        <Avatar  src={session?.user?.image}  sqPixels={400} />
                    </span>
                    <div onClick={() => imageRef.current?.click()} className="self-auto text-center font-semibold text-lg">
                        Click To Upload
                    </div>
                    
                    <input id="myImage" type="file" multiple name="files" ref={imageRef} onChange={onImageChange} style={{ display: 'none' }} />
                </div>
            )}
        </>
    );
    
    
}

export default ImageUploadUserProfilePhoto