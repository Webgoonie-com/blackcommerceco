"use client"

import React from 'react'
import Container from '../Container'
import Logo from '../Logo'
import { User } from "next-auth"
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from '@/Types'

interface NavbarPublicProps {
    currentUser?: SafeUser | null;
}

const NavbarPublic: React.FC<NavbarPublicProps> = ({currentUser}) => {


    return (
        <div className="w-full bg-gray-950 text-white z-10 shadow-sm relative">
            <div className="py-4 border-b-[1px]">
                <Container>
                   <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                     <Logo />
                     <Search />
                     <UserMenu currentUser={currentUser as any} />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default NavbarPublic