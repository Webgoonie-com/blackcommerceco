"use client"

import React, { useState } from 'react';

import { loginAdmin } from '@/lib/cookieAuth'
import { useRouter } from 'next/navigation';

const AdministratorPage = () => {

    const router = useRouter();

    // Using the useState hook to manage state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        hashedPassword: "",
        error: '',
        isLoading: false
    });

    const showError = (err: any) => {

        const error = err;
        
        setFormData({
            ...formData,
            error: error,
            isLoading: false
        });
    }

    const handleChange = (event: any) => {
        // Updating the state based on the input name

        setFormData({
            ...formData,
            error: '',
            isLoading: false,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        //  Clear formData before submission
        setFormData({
            ...formData,
            isLoading: true,
            error: '',
        });
        
        try {
            const admin = await loginAdmin(formData.email, formData.hashedPassword)

            if (admin) {
                router.push("/dashboard");
            } else {
                //  Handle unsuccessful login
                //  console.error('Login unsuccessful');
                showError('Login unsuccessful');
            }
            
        } catch (error) {
            console.log('Error on handle submit for admin')
        }
    }



    return (
        <div className='py-4 flex flex-col align-items-center ml-9 mt-20'>
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

                <button className='' type='submit'>Submit</button>

                {formData.error ? ( 
                    <div className='text-red-600'>
                        {formData.error}
                    </div>
                ) : ''}
            </form>
        </div>
    );
}

export default AdministratorPage;
