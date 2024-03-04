"use client"

import React, { useState } from 'react';

import { loginUser } from '@/lib/cookieAuth'
import { useRouter } from 'next/navigation';


const Userlogin = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    hashedPassword: "",
    error: ''
  });

  const showError = (err: any) => {
    
    const error = err;
    
    setFormData({
        ...formData,
        error: error,
    });
  }

  const handleChange = (event: any) => {
    // Updating the state based on the input name

    setFormData({
        ...formData,
        error: '',
        [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: any) => {

    event.preventDefault();

    //  Clear formData before submission
    setFormData({
      ...formData,
      error: '',
    });
    
    try {
      const user = await loginUser(formData.email, formData.hashedPassword);
      
      if (user) {
        //  Only redirect if login was successful
        router.push("/backoffice");
      } else {
        //  Handle unsuccessful login
        //  console.error('Login unsuccessful');
        showError('Login unsuccessful');
      }

    } catch (error) {
      console.error('Login failed:', error);
    }

  }

  


  return (
    <div className='flex flex-col'>
        <form onSubmit={handleSubmit}>
            <div>
                <input name='firstName' type="text" placeholder="First Name" onChange={handleChange} />
            </div>
            <div>
                <input name='lastName' type="text" placeholder="Last Name" onChange={handleChange} />
            </div>
            <div>
                <input name='email' type="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div>
                <input name='hashedPassword' type="password" placeholder="Password" onChange={handleChange} />
            </div>

            <button type='submit'>Submit</button>

            {formData.error ? ( 
              <div className='text-red-600'>
                  {formData.error}
              </div>
            ) : ''}

        </form>
    </div>
);
}

export default Userlogin