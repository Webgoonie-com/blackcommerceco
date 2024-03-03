"use client"

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

import useRegisterModal from '@/Hooks/useRegisterModal'
import useLoginModal from '@/Hooks/useLoginModal'

const UserMenu = () => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
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
    
    return (
        <div className='relative'>
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={() => {}}
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
                    List Your Business
                </div>

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
                    className="absolute rounded-xl shadow-md w-[60vw] md:w-[300px] bg-white overflow-hidden right-0 top-12 text-sm"
                >
                    <div className='flex flex-col cursor-pointer'>
                    <>
                        <MenuItem 
                            onClick={loginModal.onOpen}
                            label="Login"
                        />
                        <MenuItem
                            onClick={handleRegisterModal}
                            label="Sign Up"
                        />
                    </>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu