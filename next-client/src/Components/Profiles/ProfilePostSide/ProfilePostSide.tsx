import React from 'react'
import './ProfilePostSide.css'

import ProfilePostShare from '@/Components/Profiles/ProfilePostShare/ProfilePostShare'
import getCurrentUsers from '@/Actions/getCurrentUser'

const ProfilePostSide = () => {

    const currentUser = getCurrentUsers();

  return (
    <div className='ProfilePostSide'>
            
          
            <ProfilePostShare currentUser={currentUser as any } />
            {/*
            

            <Posts /> */}
            
            
        </div>
  )
}

export default ProfilePostSide