import React from 'react'

import './MyProfile.css';
import ProfileLeftSide from '@/Components/Profiles/ProfileLeftSide';

const MyProfileClient = () => {
  return (
    <div className="MyProfileClient">
        
        <ProfileLeftSide />
        
        <div className='myProfileClientPostsSide'>
                POST
        </div>
        
        <div className='myProfileClientProfileRideSide'>
            myProfileClientProfileRideSide RightSide
        </div>

    </div>
  )
}

export default MyProfileClient