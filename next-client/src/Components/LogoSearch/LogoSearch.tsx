import React from 'react'



import './LogoSearch.css'
import Logo from '../../../public/images/birdLogo.png'
import { BiSearch } from 'react-icons/bi'
import Image from 'next/image'

const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            
            <Image src={Logo} alt="Brand Logo" />

            {/* <Logo /> */}

            <div className="Search">

                <input type='text' placeholder='#MemberSearch' />

                <div className='s-icon cursor-pointer'>
                    <BiSearch size={36} />
                </div>
            </div>
        </div>
    )
}

export default LogoSearch