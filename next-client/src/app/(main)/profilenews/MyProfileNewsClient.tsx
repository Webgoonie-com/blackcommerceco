import React from 'react'

import './MyProfileNews.css';
import ProfileLeftSide from '@/Components/Profiles/ProfileLeftSide';
import ProfilePostSide from '@/Components/Profiles/ProfilePostSide';
import ProfileRightSide from '@/Components/Profiles/ProfileRightSide';


const MyProfileNewsClient = () => {
  return (
    <div className="MyProfileNewsClient">
        
          <ProfileLeftSide />
        
        <div className='MyProfileNewsClientPostsSide'>
          <ProfilePostSide />
        </div>
        
        <div className='MyProfileNewsClientProfileRideSide'>
          <ProfileRightSide />
        </div>

    </div>
  )
}

export default MyProfileNewsClient