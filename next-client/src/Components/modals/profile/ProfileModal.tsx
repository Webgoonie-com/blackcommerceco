"use client"

import useProfileModal from "@/Hooks/useProfileModal";
import Modal from "../Modal";
import Heading from "@/Components/Heading";
import Avatar from "@/Components/Avatar";
import { useState } from "react";
import ModalHeading from "../ModalHeading";
import ImageUploadUserProfilePhoto from "@/Elements/Files/ImageUploadUserProfilePhoto";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { User } from "next-auth";


interface ProfileModalProps {
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

const ProfileModal: React.FC<ProfileModalProps> = ({currentUser}) => {

    const [disableButton, setDisableButton] =useState<Boolean>(false)

    const profileModal = useProfileModal()

    const [selectedImages, setSelectedImages] = useState<string[]>([]);

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
        
        console.log('setCustomValue Activated')

        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onChangeImages = (images: string[]) => {
            console.log('onChangeImages Activated')
        setCustomValue('imageSrc', images);

        setSelectedImages(images);

    };


    const watchImageSrc = watch('imageSrc')

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <ModalHeading
                title="Your Current Photo Modal"
                subtitle="Upload A new photo to change your profile photo"
            />
            {/* <Heading
                title="Your Current Photo"
                subtitle="Upload A new photo to change your profile photo"
            /> */}

           <ImageUploadUserProfilePhoto
                value={watchImageSrc as any}
                            
                autoSaveToken={autoSaveToken}
                onChange={onChangeImages}
                userId={'' + currentUser?.id}
                selectedImages={selectedImages}
                currentUser={currentUser as any} 
            />

        </div>
    )
    
    return ( 
        <Modal 
            isOpen={profileModal.isOpen}
            onClose={profileModal.onClose}
            onSubmit={profileModal.onOpen}
            title="Profile Picture"
            actionLabel="Change Profile Picture"
            body={bodyContent}
        />
    );
}
 
export default ProfileModal;