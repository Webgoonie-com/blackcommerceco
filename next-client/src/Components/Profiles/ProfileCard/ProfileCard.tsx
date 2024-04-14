"use client"

import React from 'react'

import Cover from '../../../../public/images/cover.jpg'
import ProfileImg from '../../../../public/images/profileImg.jpg'
import './ProfileCard.css'
import Image from 'next/image'
import Avatar from '@/Components/Avatar'
import getCurrentUsers from '@/Actions/getCurrentUser'
import { User } from '@/Types'

import { useSession } from "next-auth/react"

interface ProfileCardProps {
    currentUser: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    currentUser,
}) => {
    
   console.log('Profile Card currentUser', currentUser)

   const {data: session, update } = useSession()


    return (
      <div className='ProfileCard'>
            
        <div className="ProfileImages">
            <Image src={Cover} alt='' />
            {/* <Image src={ProfileImg} alt='' /> */}
            <Avatar sqPixels={200} src={currentUser?.image as any || session?.user?.image} />
        </div>
    

        <div className="ProfileName">
            <span>
               {currentUser?.name}
            </span>
            <span>
                Senior UI/UX Designer
            </span>
        </div>


        <div className="followStatus">
            <hr />

            <div>
                <div className="follow">
                    <span>6,890</span>
                    <span>Following</span>
                </div>
                <div className="vertln"></div>
                <div className="follow">
                    <span>1</span>
                    <span>Followers</span>
                </div>
            </div>
            <hr />
        </div>

        <span>
            View Profile
        </span>

      </div>
    )
}

export default ProfileCard  