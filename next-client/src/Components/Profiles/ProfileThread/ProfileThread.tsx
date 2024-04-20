import React from 'react'
import './ProfileThread.css'
import Comment from '../../../../public/images/comment.png'
import Share from '../../../../public/images/share.png'
import Heart from '../../../../public/images/like.png'
import NotLike from '../../../../public/images/notlike.png'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

const ProfileThread = ({}) => {
    return (
        <div key={uuidv4()} className="ProfileThread">

           {/* <Image className='postMainImg' src={data?.img} alt='' /> */}

           <div className="profileThreadActions">
                {/* <Image src={data.liked?Heart: NotLike} alt='' /> */}
                <Image src={Comment} alt='' />
                <Image src={Share} alt='' />
                
           </div>

           <span>
            {/* {data.likes} likes */}
           </span>

           <span className='detail'>
                <span><strong>
                    {/* {data.name} */}
                </strong>
                </span>
                <span>
                    {/* {data.desc} */}
                </span> 
           </span>

        </div>
    )
}

export default ProfileThread