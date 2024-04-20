import React from 'react'
import Image from 'next/image'
import './ProfileRightSide.css'

import HomeIcon from '../../../../public/images/home.png'
import NotiIcon from '../../../../public/images/noti.png'
import CommentIcon from '../../../../public/images/comment.png'
import { PiGearSixBold } from "react-icons/pi";

import ProfileTrendCard from '../ProfileTrendCard'
import { Button } from '@/Components/ui/button'

const ProfileRightSide = () => {
    return (
        <div className="ProfileRightSide">

            <div className="navIcons">
                
                <Image src={HomeIcon} alt=""  />

                <PiGearSixBold />

                <Image src={NotiIcon} alt="" />

                <Image src={CommentIcon} alt="" />

            </div>


            <ProfileTrendCard />

            <Button variant={'purple'} className='button r-button'>Share</Button>

        </div>
    )
}

export default ProfileRightSide