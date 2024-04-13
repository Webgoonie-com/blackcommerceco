"use client"

import useProfileModal from "@/Hooks/useProfileModal";
import Modal from "../Modal";
import Heading from "@/Components/Heading";
import Avatar from "@/Components/Avatar";
import { useState } from "react";

const ProfileModal = () => {

    const [disableButton, setDisableButton] =useState<Boolean>(false)

    const profileModal = useProfileModal()

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Your Current Photo"
                subtitle="Upload A new photo to change your profile photo"
            />

            <div className="flex flex-col items-center text-center p-5 cursor-pointer">

                <Avatar sqPixels={400} />
                
            </div>

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