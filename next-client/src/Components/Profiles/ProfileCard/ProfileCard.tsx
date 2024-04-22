"use client"

import React, { useCallback, useState } from 'react'

import Cover from '../../../../public/images/cover.jpg'

import './ProfileCard.css'
import Image from 'next/image'
import Avatar from '@/Components/Avatar'

import useProfileModal from '@/Hooks/useProfileModal'
import { User } from '@/Types'

import { useSession } from "next-auth/react"

interface ProfileCardProps {
    currentUser: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    currentUser,
}) => {
    
   
    const ProfilePage = true

    const {data: session, update } = useSession()

    const profileModal = useProfileModal()


    const toggleProfileOpen = useCallback(() => {
    
    profileModal.onOpen()
    
}, [profileModal])


    return (
      <div className='ProfileCard'>
            
        <div className="ProfileImages relative cursor-pointer" onClick={toggleProfileOpen}>
            <Image src={Cover} alt='' />
            {/* <Image src={ProfileImg} alt='' /> */}
            <Avatar sqPixels={200} src={currentUser?.image as string || session?.user?.image} />
        </div>
    

        <div className="ProfileName">
            <span>
               {currentUser?.name}
            </span>
            <span>
            {/* {currentUser?.occupation}
            {currentUser?.occupationTitle} */}
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

                {ProfilePage && (
                    <>
                        <div className='vertln'></div>
                        
                        <div className='follow'>
                            <span>3</span>
                            <span>Posts</span>
                        </div>
                    </>
                    )
                }

                {/* {ProfilePage &&  (
                     <div>

                     </div>
                    )  
                    :
                    ( 
                        <div>
                            
                        </div>
                    )
                } */}
            </div>
            <hr />
        </div>

        {ProfilePage ? '' : (
            <span>
                View Profile
            </span>
         )
        }


        

      </div>
    )
}

export default ProfileCard  