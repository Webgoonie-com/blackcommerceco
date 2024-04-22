import React from 'react'

import MyProfileLeftSide from '@/Components/Profiles/MyProfileLeftSide';
import Profile from '@/Components/Profiles/Profile';
import ProfileRightSide from '@/Components/Profiles/ProfileRightSide';
import ProfilePostSide from '@/Components/Profiles/ProfilePostSide';
import './MyProfileClient.css';
import ProfileCard from '@/Components/Profiles/ProfileCard';
import getCurrentUsers from '@/Actions/getCurrentUser';
import ProfileThreads from '@/Components/Profiles/ProfileThreads';


const MyProfileClient = () => {

    const currentUser = getCurrentUsers()

    return (
      <div className="MyProfileSimpleClient">
          
            <MyProfileLeftSide />
          
          <div className='myProfileClientPostsSide Profile-center'>
            <ProfileCard currentUser={currentUser as any} />
            
            <ProfilePostSide />

            
          </div>
          
          <div className='myProfileClientProfileRideSide'>
            <ProfileRightSide />
          </div>

      </div>
    )
}

export default MyProfileClient