"use client"

import React, { useState, useRef } from 'react'

import Avatar from '@/Components/Avatar';


import { FaShareNodes } from "react-icons/fa6";
import { RxVideo } from "react-icons/rx";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdPhotoCamera } from "react-icons/md";

import { useSession } from "next-auth/react"
import { User } from '@/Types';

import './ProfilePostShare.css'

interface ProfilePostShareProps {
    currentUser: User;
}

const ProfilePostShare: React.FC<ProfilePostShareProps> = ({
    currentUser,
}) => {

    const {data: session, update } = useSession()

    const [image, setImage] = useState<String | null>(null)

    const imageRef = useRef()

    const onImageChange = (event: { target: { files: any[]; }; }) => {
        console.log('onImageChange activatec')

        if(event.target.files && event.target.files[0])
        {

            let img = event.target.files[0]

            // setImage({
            //     image: URL.createObjectURL(img),
            // })

        }
    }

   
    return (
        <>
            <div className="ProfilePostShare">
            

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
                            <MdPhotoCamera />
                                Photo
                        </div>

                        <div
                            className='option'
                            style={{
                                color: "var(--video)"
                            }}

                        >
                                <RxVideo />
                                Video
                        </div>

                        <div
                            className='option'
                            style={{
                                color: "var(--location)"
                            }}

                        >
                            <HiOutlineLocationMarker />
                                Location
                        </div>

                        <div
                            className='option'
                            style={{
                                color: "var(--schedule)"
                            }}

                        >
                            <IoCalendarNumberOutline />
                                Schedule
                        </div>

                        <button className="button ps-button">
                            <FaShareNodes /> Share
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