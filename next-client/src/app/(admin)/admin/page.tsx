"use client"

import React from 'react'
import Image from 'next/image'
import AdminLogo from '../../../../public/images/logo.png'

import './Adminauth.css'

const AdminPage = () => {

    function SignUp(){
      return(
        <div className="a-right">
          
        </div>
      )
    }

    return (
      <div className="Adminauth">

          <div className="admin-left">
            
            <Image src={AdminLogo} width={200} height={100} alt="" />

            <div className="Webname">
              <h1 className="font-bold mb-5">Admin Login</h1>
              <h6 className='font-semibold text-base'>Explore The shit you need to do.</h6>
            </div>

          </div>

          <h1 className='font-bold text-3xl'>Form</h1>
      </div>
    )
}

export default AdminPage