import React from 'react'

import LogoSearch from '@/Components/Profiles/LogoSearch/LogoSearch'

import './MyProfileLeftSide.css'


import ProfileInfoCard from '../ProfileInfoCard'
import FollowersCard from '../Followers/FollowersCard'

import getCurrentUser from '@/Actions/getCurrentUser'

const MyProfileLeftSide = async () => {

    const currentUser =  await getCurrentUser()

    return (
        <div className="MyProfileLeftSide">
            
            {/* <LogoSearch /> */}

            <ProfileInfoCard currentUser={currentUser as any} />

            <FollowersCard currentUser={currentUser as any} />
        </div>
    )
}

export default MyProfileLeftSide