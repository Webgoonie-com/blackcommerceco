import React from 'react'

import './MyProfile.css';
import ProfileLeftSide from '@/Components/Profiles/ProfileLeftSide';
import ProfilePostSide from '@/Components/Profiles/ProfilePostSide';
import ProfileRightSide from '@/Components/Profiles/ProfileRightSide';


const MyProfileClient = () => {
  return (
    <div className="MyProfileClient">
        
          <ProfileLeftSide />
        
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