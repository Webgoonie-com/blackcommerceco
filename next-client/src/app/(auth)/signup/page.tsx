"use client"

import React from 'react'
import Image from 'next/image'
import AdminLogo from '../../../../public/images/logo.png'

import './AuthSignUp.css'

const SignUpPage = () => {

    function SignUp(){
      return(
        <div className="a-right">
          <form action="" className="info-form-control authForm">
            
            <h3  className='font-bold text-3xl'>Sign Up</h3>

            <div>
              
              <input name="firstName" className='infoInput' type='text' placeholder='First Name' />

              <input name="lastName" className='infoInput' type='text' placeholder='Last Name' />

            </div>

            <div>
              <input name="userName" className='infoInput' type='text' placeholder='User Name' />
            </div>

            <div>
              <input name="userEmail" className='infoInput' type='text' placeholder='Email' />
            </div>

            <div>
              <input name="userPassword" className='infoInput' type='text' placeholder='Password' />

              <input name="userConfirmPassword" className='infoInput' type='text' placeholder='Confirm Password' />
            </div>

            <div>
              <span style={{fontSize: '12px'}}>Already Have An Account? <span className='cursor-pointer'>Login!</span></span>
            </div>

            <button type="button" className='button infoButton'>Sign Up</button>

          </form>
        </div>
      )
    }

    return (
      <div className="AuthSignUp">

          <div className="admin-left">
            
            <Image src={AdminLogo} width={200} height={100} alt="" />

            <div className="Webname">
              <h1 className="font-bold mb-5">User Sign Up</h1>
              <h6 className='font-semibold text-base'>Explore The Resources we been needing for along time.</h6>
            </div>

          </div>

          <SignUp />
      </div>
    )
}

export default SignUpPage