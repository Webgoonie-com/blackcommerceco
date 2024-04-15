"use client"

import React, { useState, useRef } from 'react'
import './ProfilePostShare.css'
import profileImg from "../../img/profileImg.jpg";
import Avatar from '@/Components/Avatar';

// import { UilScenery} from "@iconscout/react-unicons";
// import { UilPlayCircle  } from "@iconscout/react-unicons";
// import { UilLocationPoint  } from "@iconscout/react-unicons";
// import { UilSchedule  } from "@iconscout/react-unicons";
// import { UilTimes  } from "@iconscout/react-unicons";

import { useSession } from "next-auth/react"
import { User } from '@/Types';

interface ProfilePostShareProps {
    currentUser: User;
}

const ProfilePostShare: React.FC<ProfilePostShareProps> = ({
    currentUser,
}) => {

    const {data: session, update } = useSession()

    // const [image, setImage] = useState(null)

    // const imageRef = useRef()

    // const onImageChange = (event) => {
    //     console.log('onImageChange activatec')

    //     if(event.target.files && event.target.files[0])
    //     {

    //         let img = event.target.files[0]

    //         setImage({
    //             image: URL.createObjectURL(img),
    //         })

    //     }
    // }

   
    return (
        <>
            <div className="ProfilePostShare">
            
            {/* <img src={profileImg} alt="" /> */}

            <Avatar sqPixels={200} src={currentUser?.image as any || session?.user?.image} />
    
                <div>

                    <input type="text" placeholder="What's happening now with you?"  />

                    <div className="postOptions">

                        <div
                            className='option'
                            style={{
                                color: "var(--photo)"
                            }}
                            // onClick={() => {
                            //     imageRef.current.click()
                            // }}

                        >
                            {/* <UilScenery />
                                Photo */}
                        </div>

                        <div
                            className='option'
                            style={{
                                color: "var(--video)"
                            }}

                        >
                            {/* <UilPlayCircle /> */}
                                Video
                        </div>

                        <div
                            className='option'
                            style={{
                                color: "var(--location)"
                            }}

                        >
                            {/* <UilSchedule /> */}
                                Location
                        </div>

                        <div
                            className='option'
                            style={{
                                color: "var(--schedule)"
                            }}

                        >
                            {/* <UilLocationPoint /> */}
                                Schedule
                        </div>

                        <button className="button ps-button">
                            Share
                        </button>

                        <div style={{ display: "none"}}>
                            {/* <input 
                                type='file'
                                name='myImage'
                                ref={imageRef}
                                onChange={onImageChange}
                            /> */}
                        </div>

                    </div>

                    {/* {image && (

                        <div className="previewImage">
                            
                            <span title='Click To Remove...'>
                                {/* <UilTimes
                                    
                                    className="useIcon"
                                    onClick={() => { setImage(null) } }
                                />
    
                            </span>

                            <img className='selectedPostImage' src={image.image} alt="" />

                        </div>
                    )} */}

                </div>

            </div>
        </>
    )
}

export default ProfilePostShare