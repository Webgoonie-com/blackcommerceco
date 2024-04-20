import React from 'react'
import './ProfileThreads.css'
import Comment from '../../../../public/images/comment.png'
import Share from '../../../../public/images/share.png'
import Heart from '../../../../public/images/like.png'
import NotLike from '../../../../public/images/notlike.png'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'
import { PostsData } from '../ProfileDummyData/PostData'
import ProfileThread from '../ProfileThread/ProfileThread'

const ProfileThreads = ({}) => {
    return (
        <div className="ProfileThreads">

          {PostsData.map((post, id) => {
            return <ProfileThread key={id} />
          })}

           

        </div>
    )
}

export default ProfileThreads