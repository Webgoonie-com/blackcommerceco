"use client"

import React from 'react'
import { User } from '@/Types'
import { FaPencilAlt } from "react-icons/fa";
import { Button } from '@/Components/ui/button';

import './ProfileInfoCard.css'


interface ProfileInfoCardProps {
    currentUser: User;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = (currentUser) => {

    const handleEditProfileModal = () => {
        console.log('Clicked On Edit Profile.')
    }

    return (
        <div className="ProfileInfoCard">
            
            <div className="infoHead">
                
                <h4>Your Info</h4>

                <FaPencilAlt onClick={handleEditProfileModal} className="cursor-pointer" width={"2rem"} height={"1.2rem"} />

            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>In A Relationship</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives In </b>
                </span>
                <span>Columbus, GA</span>
            </div>

            <div className="info">
                <span>
                    <b>Works At </b>
                </span>
                <span>WebGoonie.com</span>
            </div>

            <Button className='button logout-button'>Log Out</Button>

        </div>
    )
}

export default ProfileInfoCard