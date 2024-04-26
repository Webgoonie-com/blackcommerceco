"use client"

import React from 'react'
import Image from 'next/image'
import AdminLogo from '../../../../public/images/logo.png'

import './AuthLogin.css'

const LoginPage = () => {

    function SignUp(){
      return(
        <div className="a-right">
          <form action="" className="info-form-control authForm">
            
            <h3  className='font-bold text-3xl'>Login</h3>


            <div>
              <input name="userEmail" className='infoInput' type='text' placeholder='Email' />
            </div>

            <div>
              <input name="userPassword" className='infoInput' type='text' placeholder='Password' />


            </div>

            <div>
              <span style={{fontSize: '12px'}}>Don{"'"}t Already Have An Account? <span className='cursor-pointer'>SignUp!</span></span>
            </div>

            <button type="button" className='button infoButton'>Login In</button>

          </form>
        </div>
      )
    }

    return (
      <div className="LoginAuth">

          <div className="login-left">
            
            <Image src={AdminLogo} width={200} height={100} alt="" />

            <div className="Webname">
              <h1 className="font-bold mb-5">User Login</h1>
              <h6 className='font-semibold text-base'>Explore The shit you need to do.</h6>
            </div>

          </div>

          <SignUp />
      </div>
    )
}

export default LoginPage