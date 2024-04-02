"use client"

import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";
import useLoginModal from "@/Hooks/useLoginModal";
import useRegisterModal from "@/Hooks/useRegisterModal";
import Container from "@/Components/Container";

const Hero = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { data: session, status } = useSession();


    //  const dataSessions = session;  

   
    
    return (
        <section className="h-screen w-full bg-cover bg-center clearfix relative position-relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506956191951-7a88da4435e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074')`}}>
            <Container>
                <div className="flex flex-col h-full justify-center absolute">
                    <div className="max-w-[51rem] px-2 md:mt-20 xl:mt-20">
                        <div className="bg-zinc-700 border-2 rounded border-slate-200 opacity-70 p-5">
                            <h4 className="text-[2.4rem] leading-tight text-white font-bold">
                                Building The African Diaspora
                            </h4>
                            <p className="text-base mt-2 mb-2 font-bold text-purple-500">
                                Welcome to the Black Business Directory And Available Properties all within a well sound ecosystem of the African Diaspora and it{"'"}s people throughout its nations. This is a community of businesses and people who are passionate about building a better future for their people.
                            </p>
                            <p className="text-base mt-2 mb-2 font-bold text-purple-500">
                                We hold our destiny in our own hands. No one else will come to save us but us.
                            </p>
    
                            <p className="text-base mt-2 mb-4 font-bold text-purple-500">Today we arrise to the occocation to make a positive difference in our world and future.</p>
    
                            {!session?.user ? (
                                <h2 className="text-[1.4rem] leading-tight text-white font-bold">Join Us Today...</h2>
                            ) : null}

                            <div className="flex items-center space-x-3 mt-5">
                                {!session?.user ? (
                                    <>
                                        <button onClick={loginModal.onOpen} className="bg-purple-500 text-white outline-none border-2 border-purple-600  rounded-md text-sm font-semibold px-6 py-3">
                                            Login
                                        </button>
                                        <button onClick={registerModal.onOpen} className="bg-purple-500 outline-none border-2 border-purple-600 text-white rounded-md text-sm font-semibold px-6 py-3 bg-darkBlue">
                                            Sign Up
                                        </button>
                                    </>
                                ) : (
                                    <button className="bg-purple-500  outline-none border-2 border-purple-600 text-white-50 rounded-md text-sm font-semibold px-6 py-3">
                                        Welcome {session.user?.name}!
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    )
}
export default Hero