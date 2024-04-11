"use client"

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {callCountries} from '@/ServiceCalls/callCountries';

const Footer = () => {
        
        const [email, setEmail] = useState('');
        const [systemCountries, setSystemCountries] =  useState<string[]>([]);

        const fetchCountries = async () => {
            try {
                const countries = await callCountries();
                
                console.log('Countries Returned:', countries)

                setSystemCountries(countries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        
        const handleEmailSubscribe = async () => {
            // Check if the email is not empty and is a valid email address
            if (email.trim() !== '' && /\S+@\S+\.\S+/.test(email)) {
                try {
                    // Send a POST request to your API route
                    
                    // Clear the input after successful subscription
                    setEmail('');
                } catch (error) {
                    console.error('Error subscribing:', error);
                }
            } else {

                toast.error(
                    'Please enter a valid email address.',
                    {
                        duration: 7000,
                        position: 'top-center',
       
                    }
                )
            }
        };
    
        const handleInputChange = (e: any) => {
            setEmail(e.target.value);
        };



        useEffect(() => {
           
    
            fetchCountries();
        }, []);

        return (
            <footer id="footer" className="w-full text-gray-600 relative bg-gray-950">
                <div className="px-1 py-2 md:px-36 md:py-24 mb-10 mx-auto bg-gray-950">
                    <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4 bg-gray-950">
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">PROPERTIES</h2>
                            <nav className="list-none mb-10">
                            
                                
                            {systemCountries.length > 0 ? (
                                systemCountries.map((systemCountry: any, i: number) => (
                                    <li key={i}>
                                        <a className="text-gray-500 hover:text-gray-800 duration-200">
                                           <span className={`fi fi-${systemCountry?.isoCode.toLowerCase()}`}></span>
                                           {" "}
                                           In {systemCountry.label}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <>
                                    <li>
                                        <a className="text-gray-500 hover:text-gray-800 duration-200">GHANA</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-500 hover:text-gray-800 duration-200">AMERICA</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-500 hover:text-gray-800 duration-200">KENYA</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-500 hover:text-gray-800 duration-200">UGANDA</a>
                                    </li>
                                </>
                            )}

                                
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">BUSINESSES</h2>
                                <nav className="list-none mb-10">
                                    {systemCountries.length > 0 ? (
                                        systemCountries.map((systemCountry: any, i: number) => (
                                            <li key={i}>
                                                <a className="text-gray-500 hover:text-gray-800 duration-200">
                                                <span className={`fi fi-${systemCountry?.isoCode.toLowerCase()}`}></span>
                                                {" "}
                                                In {systemCountry.label}
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li>
                                                <a className="text-gray-500 hover:text-gray-800 duration-200">GHANA</a>
                                            </li>
                                            <li>
                                                <a className="text-gray-500 hover:text-gray-800 duration-200">AMERICA</a>
                                            </li>
                                            <li>
                                                <a className="text-gray-500 hover:text-gray-800 duration-200">KENYA</a>
                                            </li>
                                            <li>
                                                <a className="text-gray-500 hover:text-gray-800 duration-200">UGANDA</a>
                                            </li>
                                        </>
                                    )}
                                </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">NEWS</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 1</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 2</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 3</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 4</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">MEDIA</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 1</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 2</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 3</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 4</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">COMMUNITY</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 1</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 2</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 3</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 4</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-200 tracking-widest text-sm mb-3">DIASPORA PROJECTS</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 1</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 2</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 3</a>
                                </li>
                                <li>
                                <a className="text-gray-500 hover:text-gray-800 duration-200">Coming Soon 4</a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
               
                
                
                
                <div
                    className="
                        bottom-0
                        absolute
                        inset-0
                        max-w-md
                        mx-auto
                        h-72
                        blur-[118px]
                        " 
                    style={{ 
                        background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" 
                    }}
                ></div>

                <div className="border-t border-gray-800  bg-gray-950">
                    <div className="px-5 py-8 flex flex-wrap mx-auto items-center">
                        <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
                            <div className="relative sm:w-72 md:w-[60%] xl:w-[70%] sm:mr-4 mr-2 left-3">
                                <label className="leading-7 text-sm text-white">Subscribe To Our NewsLetter For Special Offers And Annoucements Today.</label>
                                <input
                                    type="email"
                                    id="footer-field"
                                    name="footer-field"
                                    value={email} // Use value instead of defaultValue
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Primary Email..."
                                    className="
                                        self-start w-full bg-gray-800 bg-opacity-50 rounded-md border border-gray-700 focus:ring-2 focus:bg-transparent focus:ring-green-200 focus:border-green-500 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                                        xs:mb-2 xs:mt-5
                                        sm:mb-2 sm:mt-5
                                        md:mb-0 md:mt-5
                                        xl:mb-0 xl:mt-5
                                        mb-5 mt-5
                                    "
                                />
                            </div>
                            <button onClick={handleEmailSubscribe} className="
                                    xl:w-[25%]
                                    md:w-[25%]
                                    sm:w-[75%]
                                    inline-flex
                                    text-white
                                    bg-purple-600
                                    border-0 
                                    py-2
                                    px-6
                                    focus:outline-none
                                    hover:bg-green-700
                                    duration-200
                                    rounded
                            ">
                                Subscribe Today!
                            </button>
                            
                        </div>
                        <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto px-4">
                            <a className="text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>

                <div className="bg-gray-900">
                    <div className="
                        mx-auto
                        bottom-0
                        
                        px-8
                        py-4
                        flex
                        flex-wrap
                        flex-col
                        sm:flex-row
                        ">
                        
                        <p className="text-gray-500 text-sm text-center sm:text-left">
                            
                            © 2024 BlackCommerce.co —
                            
                            <a href="https://twitter.com/blackcommerce" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">
                                @blackcommerce.co
                            </a>
                        </p>
                        
                        <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
                            All Rights Reserved | Witness A WebGoonie Project Made From ❤
                        </span>

                    </div>
                </div>

            </footer>
        )
}

export default Footer
