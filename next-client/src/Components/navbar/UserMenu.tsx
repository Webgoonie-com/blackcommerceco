"use client"

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

import useRegisterModal from '@/Hooks/useRegisterModal'
import useLoginModal from '@/Hooks/useLoginModal'

import useBusinessRegistrationModal from '@/Hooks/useBusinessRegistrationModal'
import useRentMyPropertyModal from '@/Hooks/useRentMyPropertyModal'

import { signOut, useSession } from "next-auth/react"

import { CurrentUser } from '@/Types/nextauth'
import { SafeUser } from '@/Types'
import { useRouter } from 'next/navigation'
import useProfileModal from '@/Hooks/useProfileModal'


interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const router = useRouter()

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const businessRegistrationModal = useBusinessRegistrationModal()

    const rentMyPropertyModalModal = useRentMyPropertyModal()

    const profileModal = useProfileModal()

    const [isOpen, setIsOpen] = useState(false)

    const [isOpenProfileWindow, setIsOpenProfileWindow] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    
    const toggleProfileOpen = useCallback(() => {
        profileModal.onOpen()
        setIsOpen((value) => !value)
    }, [])

    const handleLoginModal = () => {
        loginModal.onOpen()
        setIsOpen(false)
    }
    const handleRegisterModal = () => {
        registerModal.onOpen()
        setIsOpen(false)
    }

    const toggleMenuClosed = useCallback(() => {
        setIsOpen(false)
    }, [])


  

    const onQuickLogin = useCallback(() => {

        if(!currentUser){

            return loginModal.onOpen()
        }

    }, [currentUser, loginModal])

    
    return (
        <div className='relative'>
            <div className="flex flex-row items-center gap-3">
                

                {currentUser ? (

                    <>
                        <div 
                            onClick={onQuickLogin}
                            className="
                                hidden 
                                md:block 
                                text-sm 
                                font-font-semibold
                                py-3 px-4 
                                rounded-full
                                hover:bg-neutral-400 
                                hover:dark:bg-neutral-800 
                                cursor-pointer"
                        >
                            {currentUser.name} <span className='text-green-400 font-bold'>{' Online '}</span>
                        </div>
                    </>

                    ) : (

                    <>
                        <div 
                            onClick={onQuickLogin}
                            className="
                                hidden 
                                md:block 
                                text-sm 
                                font-font-semibold
                                py-3 px-4 
                                rounded-full
                                hover:bg-neutral-400 
                                hover:dark:bg-neutral-800 
                                cursor-pointer"
                        >
                            Circlulate Black Dollars
                        </div>
                    </>

                    )}

                <div
                    id="toggleAvtarMenu"
                    onClick={toggleOpen}
                    className="
                        p-4 
                        md:py-1 
                        md:px-1 
                        border-[1px]
                        border-gray-200
                        flex 
                        flex-row 
                        items-center 
                        gap-3 
                        rounded-full 
                        cursor-pointer 
                        hover:shadow-md transition"
                        
                >
                    <AiOutlineMenu color='white' />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            




            {isOpen && (
                <div
                    className="absolute rounded-xl shadow-md w-[60vw] md:w-[300px] bg-white overflow-hidden right-0 top-12 text-sm z-50"
                >
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (

                            <>
                                <hr />
                                <MenuItem 
                                    onClick={ () => { 
                                        router.push("/myprofile"), 
                                        toggleMenuClosed()
                                        } 
                                    }
                                    label="My Profile"
                                />
                                
                                <hr />
                                <MenuItem 
                                    onClick={toggleProfileOpen}
                                    label="Profile Picture"
                                />
                                <hr />
                                <MenuItem 
                                    onClick={ () => { 
                                        router.push("/pendingstays"), 
                                        toggleMenuClosed()
                                        } 
                                    }
                                    label="Pending Reservations"
                                />
                                <MenuItem 
                                    onClick={ () => { 
                                        router.push("/myfavorites"),
                                        toggleMenuClosed()
                                        } 
                                    }
                                    label="My Favorites"
                                />
                                <MenuItem 
                                    onClick={ () => {  
                                        router.push("/propertybookings"),
                                        toggleMenuClosed()
                                        } 
                                    }
                                    label="My Property Bookings"
                                />
                                <MenuItem 
                                    onClick={ () => {  
                                        router.push("/mybusinesses"),
                                        toggleMenuClosed()
                                        } 
                                    }
                                    label="My Business Listings"
                                />
                                <MenuItem 
                                    onClick={ () => {  
                                        router.push("/myproperties"),
                                        toggleMenuClosed()
                                        } 
                                    }
                                    label="My Property Listings"
                                />
                                <MenuItem 
                                    onClick={ () => { rentMyPropertyModalModal.onOpen(),  toggleMenuClosed()} }
                                    label="List A New Property"
                                />
                                
                                <MenuItem 
                                    onClick={ () => { businessRegistrationModal.onOpen(),  toggleMenuClosed()} }
                                    label="List A New Business"
                                />
                                {/* <hr />
                                <MenuItem 
                                    onClick={ () => {  
                                        router.push("/office"),
                                        toggleMenuClosed()
                                        } 
                                    }
                                    label="My Back Office"
                                /> */}
                                <hr />
                                <MenuItem
                                    onClick={() => {signOut(),  toggleMenuClosed()}}
                                    label="Sign Out"
                                />
                            </>

                        ) : (

                            <>
                                <MenuItem 
                                    onClick={handleLoginModal}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={handleRegisterModal}
                                    label="Sign Up"
                                />
                            </>

                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu