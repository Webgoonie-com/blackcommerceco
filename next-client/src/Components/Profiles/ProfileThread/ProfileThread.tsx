import React from 'react'
import './ProfileThread.css'
import Comment from '../../../../public/images/comment.png'
import Share from '../../../../public/images/share.png'
import Heart from '../../../../public/images/like.png'
import NotLike from '../../../../public/images/notlike.png'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'


interface ProfileThreadProps {
    data: any;
    id: string;
}

const ProfileThread: React.FC<ProfileThreadProps> = ({
    data,
    id
}) => {
    return (
        <div key={uuidv4()} id={id} className="ProfileThread">

           <Image className='postMainImg' src={data?.img} alt='' />

           <div className="profileThreadReactions">

                <Image src={data.liked ? Heart : NotLike} alt='' />
                <Image src={Comment} alt='' />
                <Image src={Share} alt='' />
                
           </div>

           <span>
            {data?.likes} likes
           </span>

           <span className='detail'>

                <span>
                    <strong>
                        {data?.name}: <br />
                    </strong>
                </span>
                
                <span>
                    {data?.description}
                </span>

           </span>

        </div>
    )
}

export default ProfileThread