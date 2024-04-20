import React from 'react'

import './MyProfile.css';
import MyProfileLeftSide from '@/Components/Profiles/MyProfileLeftSide';
import ProfilePostSide from '@/Components/Profiles/ProfilePostSide';
import ProfileRightSide from '@/Components/Profiles/ProfileRightSide';


const MyProfileClient = () => {
  return (
    <div className="MyProfileClient">
        
        <MyProfileLeftSide />
        
        <div className='myProfileClientPostsSide'>
          <ProfilePostSide />
        </div>
        
        <div className='myProfileClientProfileRideSide'>
          <ProfileRightSide />
        </div>

    </div>
  )
}

export default MyProfileClient