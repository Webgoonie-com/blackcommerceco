'use client';

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import axios from 'axios';

import useRegisterModal from '@/Hooks/useRegisterModal';
import useLoginModal from '@/Hooks/useLoginModal';

import Modal from "../Modal";
import ModalHeading from "../ModalHeading";

import Input from '@/Elements/Inputs/Input';
import InputPassword from '@/Elements/Inputs/InputPassword';

import Button from '@/Elements/Button'

const RegisterModal = () => {
    const router = useRouter();

    const registerModal = useRegisterModal();

    const loginModal = useLoginModal();
    
    const [isLoading, setIsLoading] = useState(false);

    const { 
            register, 
			resetField,
            handleSubmit, 
            formState: { 
                errors 
            }
        } = useForm<FieldValues>(
            {
                defaultValues: {
                    email: '',
                    hashedPassword: '',
                }
            }
        );
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
       
        setIsLoading(true);
       
        signIn('credentials', {
			...data,
			redirect: false,
		})
		.then((callback) => {
			
			//console.log('callback', callback)

			setIsLoading(false)

			if(callback?.ok){
				
                toast.success('successfully Logged In', {
                    duration: 7000,
                    position: 'bottom-right',
                });

				router.refresh()
				loginModal.onClose()
			}

			if(callback?.error){
				
				console.log('Line 75 on Login Modal Error', callback.error)

				toast.error("Sorry Wrong Credentials Try Again.", {
                    duration: 7000,
                    position: 'bottom-right',
                });

				resetField('hashedPassword')
				return false;
			}
		})
    };

    const toggleModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])


    const bodyContent = (
        <div id="regBody" className="flex flex-col gap-4">
            <div className="row position-absolute">
                <ModalHeading
                    title={'Welcome Back'}
                    subtitle={`LogIn to your account...`}
                />
           </div>
            <div className="flex items-center gap-2">
                <Input id='email' type='email' label='Primary Email' disabled={isLoading} register={register} errors={errors} required  />
            </div>
            <div className="flex items-center gap-2">
                <InputPassword id='hashedPassword' type='password' label='Enter Your Password' disabled={isLoading} register={register} errors={errors} required  />
            </div>
        </div>
    );


    const footerContent = (
        <div className='flex flex-col gap-4'>
            <hr />
            {/* <Button
                outline
                label='Continue With Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
                //onClick={() => {console.log('Clicked Continue With Google!')}}

            />
            <Button
                outline
                label='Continue With Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
                //onClick={() => {console.log('Clicked Continue With GitHub!')}}

            /> */}
            <div className="justify-start flex flex-row items-center gap-2 text-gray-500 text-center mt-4 font-light">
                    <div>First Time using  BlackCommerce? </div>
                
                    <div 
                        className="text-white hover:underline hover:cursor-pointer"
                        onClick={toggleModal}>
                            Create an Account?
                    </div>
                    
                    <div 
                        style={{ textAlign: 'right', color: 'pink', position: 'absolute',}}
                        className="right-2 pe-5 position-absolute text-align-items-end justify-content-end d-flex cursor-pointer"
                        onClick={ loginModal.onClose}>
                            Cancel
                    </div>
                
            </div>
        </div>
    );

    return (
                <Modal 
                    disabled={isLoading} 
                    isOpen={loginModal.isOpen} 
                    title="Login"
                    actionLabel={'Continue'}
                    onClose={loginModal.onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    body={bodyContent}
                    footer={footerContent}
                />
            )
}

export default RegisterModal




