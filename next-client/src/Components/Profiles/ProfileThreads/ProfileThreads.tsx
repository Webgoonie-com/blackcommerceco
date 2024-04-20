import React from 'react'
import './ProfileThreads.css'

import { PostsData } from '../ProfileDummyData/PostData'
import ProfileThread from '../ProfileThread/ProfileThread'

const ProfileThreads = ({}) => {
    return (
        <div className="ProfileThreads">

          {PostsData.map((post, id) => {
            return <ProfileThread data={post} id={id.toString()} key={id} />
          })}

           

        </div>
    )
}

export default ProfileThreads