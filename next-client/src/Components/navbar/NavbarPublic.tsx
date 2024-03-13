"use client"

import React from 'react'
import Container from '../Container'
import Logo from '../Logo'
import { User } from "next-auth"
import Search from './Search';
import UserMenu from './UserMenu'

import CategoriesNav from '../navbar/categories/CategoriesNav'

interface NavbarPublicProps {
    currentUser?: User | null;
}

const NavbarPublic: React.FC<NavbarPublicProps> = ({currentUser}) => {


    return (
        <div className="w-full bg-gray-950 text-white shadow-sm relative z-50">
            <div className="py-4 border-b-[1px]">
                <Container>
                   <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                     <Logo />
                     <Search />
                     <UserMenu currentUser={currentUser as any} />
                    </div>
                </Container>

                <CategoriesNav />
            </div>
        </div>
    )
}

export default NavbarPublic