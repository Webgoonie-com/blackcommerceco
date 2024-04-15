
import React from 'react'
import './ProfilePosts.css'
import { PostsData } from '@/Components/Profiles/ProfileDummyData/PostData'
//import Post from '@/Components/Profiles/ProfilePosts'

const ProfilePosts = () => {
    return (
          
      <div className='Posts'>
          {PostsData && PostsData.map((post, id) => {
              return(
                  <div key={id}>
                    {/* <Post data={post} id={id} /> */}
                  </div>
              )
          })}            
      </div>
  )
}

export default ProfilePosts