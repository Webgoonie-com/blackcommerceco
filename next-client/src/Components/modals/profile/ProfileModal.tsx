"use client"

import useProfileModal from "@/Hooks/useProfileModal";
import Modal from "../Modal";
import Heading from "@/Components/Heading";
import Avatar from "@/Components/Avatar";
import { useCallback, useState } from "react";
import ModalHeading from "../ModalHeading";
import ImageUploadUserProfilePhoto from "@/Elements/Files/ImageUploadUserProfilePhoto";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { User } from "next-auth";
import { autoSavePrimaryUserPhoto } from "@/ServiceCalls/callUsers";


interface ProfileModalProps {
    currentselectedImage?: string[],
    autoSaveToken?: string,
    currentUser: User,
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

const ProfileModal: React.FC<ProfileModalProps> = ({
    currentUser,
    }) => {

    const [isSubmitting, setIsSubmitting] = useState(false); 

    const [disableButton, setDisableButton] =useState<Boolean>(false)

    const profileModal = useProfileModal()

    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    const [propSelectedImage, setPropSelectedImage] = useState<string[]>([]);

    const [autoSaveToken, setAutoSaveToken] = useState<string>(makeToken(20));

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
       
        imageSrc: '',
        streetAddress: '',
        streetAddress2: '',
        streetCity: '',
        streetZipCode: '',
        token: autoSaveToken,
        userId: currentUser?.id,
        description: '',
        title: '',
       
    }
})

    const setCustomValue = (id: string, value: any) => {
        
        

        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onChangeImages = (image: string[]) => {
            
        setCustomValue('imageSrc', image);

        setSelectedImage(image);

        setPropSelectedImage(image)

    };

    const onCancel = useCallback(async() => {

        
        toast.loading("No worries Canceling", {
            duration: 1000,
            position: 'bottom-right',
            
        });

        profileModal.onClose()
        
    }, [profileModal])

    

    const onSubmit = useCallback(async () => {
        if (!isSubmitting) { // Check if form is already submitting
            setIsSubmitting(true); // Set submitting state to true to prevent multiple submissions

            const formData = watch(); // Retrieve form data

            if (selectedImage.length > 0) {
                

                try {
                    const responseData = await autoSavePrimaryUserPhoto(selectedImage, autoSaveToken, currentUser?.id);

                    profileModal.onClose()

                    toast.success('Success Profile Photo Updated!', {
                        duration: 7000,
                        position: 'bottom-right',
                        icon: '🔥',
                    });
                } catch (error) {
                    console.error('Error saving photo:', error);
                    toast.error('An error occurred while updating profile photo.', {
                        duration: 5000,
                        position: 'bottom-right',
                    });
                } finally {
                    setIsSubmitting(false); // Reset submitting state after submission is complete
                }
            } else {
                toast.error("Sorry No Photo Uploaded...", {
                    duration: 3000,
                    position: 'bottom-right',
                });
                toast.error("Try Uploading A Photo...", {
                    duration: 5000,
                    position: 'bottom-right',
                    icon: '🔥',
                });
                setIsSubmitting(false); // Reset submitting state if no photo uploaded
            }
        }
    }, [autoSaveToken, currentUser?.id, profileModal, selectedImage, watch, isSubmitting]);



    const watchImageSrc = watch('imageSrc')

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <ModalHeading
                title="Your Current Profile Photo"
                subtitle="Upload a new photo to change your current profile photo..."
            />
           

           <ImageUploadUserProfilePhoto
                value={watchImageSrc as any}
                autoSaveToken={autoSaveToken}
                onChange={onChangeImages}
                userId={currentUser?.id}
                selectedImage={selectedImage}
                currentUser={currentUser as any}
                propSelectedImage={propSelectedImage as any}
            />

        </div>
    )
    
    return ( 
        <Modal 
            isOpen={profileModal.isOpen}
            onClose={onCancel}
            onSubmit={onSubmit}
            title="Profile Picture"
            actionLabel="Close & Save Changes"
            secondaryActionLabel={"Cancel"}
            secondaryAction={onCancel}
            body={bodyContent}
        />
    );
}
 
export default ProfileModal;