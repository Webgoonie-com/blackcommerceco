import React from 'react'

import LogoSearch from '@/Components/LogoSearch/LogoSearch'

import './MyProfileLeftSide.css'


import ProfileInfoCard from '../ProfileInfoCard'

const MyProfileLeftSide = () => {
    return (
        <div className="MyProfileLeftSide">
            
            <LogoSearch />

            <ProfileInfoCard />
        </div>
    )
}

export default MyProfileLeftSide