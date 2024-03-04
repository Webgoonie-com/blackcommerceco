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
    });

    const handleChange = (event: any) => {
        // Updating the state based on the input name

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        try {
            const admin = await loginAdmin(formData.email, formData.hashedPassword)

            if(admin){

                router.push("/dashboard");
            }else{
                console.error('Login unsuccessful');
            }
            
        } catch (error) {
            console.log('Error on handle submit for admin')
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
            </form>
        </div>
    );
}

export default AdministratorPage;
