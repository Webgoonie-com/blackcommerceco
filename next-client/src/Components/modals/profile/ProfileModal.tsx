"use client"

import useProfileModal from "@/Hooks/useProfileModal";
import Modal from "../Modal";

const ProfileModal = () => {

    const profileModal = useProfileModal()
    
        return ( 
            <Modal 
            isOpen={profileModal.isOpen}
            onClose={profileModal.onClose}
            onSubmit={profileModal.onOpen}
            title="Profile Picture"
            actionLabel="Change Profile Picture"
            />
        );
}
 
export default ProfileModal;