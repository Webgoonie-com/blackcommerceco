import React from 'react'
import "./FollowersCard.css";
import { Followers } from '@/Components/Profiles/ProfileDummyData/FollowersData'
import Image from 'next/image';
import { User } from '@/Types';
import Avatar from '@/Components/Avatar';

interface FollowersCardProps {
  currentUser: User;
}

const FollowersCard: React.FC<FollowersCardProps> = ({
  currentUser,
}) => {

    //

    return (
        <div className="FollowersCard">
            <h3>
                Who is Following You?
            </h3>

            {Followers && Followers.map((follower, id) => {
                return(
                    <div className="follower" key={id}>
                        
                        <div>
                            
                            

                            {follower && follower?.img ? (
                                <Image src={follower?.img} alt="" className="followerImg" />
                            ) : (
                                <Avatar sqPixels={50} />
                            )}
                            
                            
                            <div className='name'>
                                <span>{follower?.name}</span>
                                <span>@{follower?.username}</span>
                            </div>
                        </div>
                        
                        <button className="button fc-button">
                            Follow Back
                        </button>

                    </div>
                )
            })}
        </div>
    )
}

export default FollowersCard