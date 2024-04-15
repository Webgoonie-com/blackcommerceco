

import React from 'react'
import ProfileCard from '../ProfileCard'
import LogoSearch from '@/Components/LogoSearch/LogoSearch'
import './ProfileLeftSide.css'
import getCurrentUser from '@/Actions/getCurrentUser'
import FollowersCard from '../Followers/FollowersCard'

const ProfileLeftSide = async () => {

  const currentUser =  await getCurrentUser()

  console.log('Profile Left side currentUser', currentUser)

  return (
    <div className="ProfileLeftSide">
        <LogoSearch />

        <ProfileCard currentUser={currentUser as any} />

        <FollowersCard currentUser={currentUser as any} />
    </div>
  )
}

export default ProfileLeftSide