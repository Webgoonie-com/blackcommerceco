'use client';

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from 'react';
import { FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
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
import InputPhoneNumberGlobal from "@/Elements/Inputs/InputPhoneNumberGlobal";

const RegisterModal = () => {
    const router = useRouter();

    const registerModal = useRegisterModal();

    const loginModal = useLoginModal();
    
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState("");


    const { 
            register, 
            handleSubmit, 
            resetField, 
            reset, 
            formState: { errors }
        } = useForm<FieldValues>(
            {
                defaultValues: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: phone,
                    password: '',
                    hashedPassword: '',
                }
            }
        );
    
 

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    
    

    // console.log('onSubmit Posting Here', data);
    
    try {
      // Make sure phone number is not empty before including it in the data
      
      const formData = {
        ...data, // Include other form data
        phone: '+'+phone, // Add phone number
      };

      //console.log(formData)
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/createUser/`, formData);
      // Handle success response
      toast.success('User Created successfully! Check your email for verification please.', {
        duration: 7000,
        position: 'bottom-right',
      });
    } catch (error) {
      // Handle error response
      console.log('Error on Register modal submit', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const onPhoneChange = (value: string) => {
    
    // You can perform any additional logic here if needed
        setPhone(value as any)
  };
  
      
    const toggleModal = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);


    const bodyContent = (
        <div id="regBody" className="flex flex-col gap-4">
            <div className="row position-absolute">
                <ModalHeading
                    title={'Welcome To Black Commerce'}
                    subtitle={`Create Your Free Account Today It's Easy!`}
                />
           </div>
           <div className="flex items-center gap-2">
                <Input id='firstName' label='Your First Name' disabled={isLoading} register={register} errors={errors} required  />
                <Input id='lastName' label='Your Last Name (or Tribe Name)' disabled={isLoading} register={register} errors={errors} required  />
            </div>
            <div className="flex items-center gap-2 z-10">
                <Input id='email' type='email' label='Primary Email' disabled={isLoading} register={register} errors={errors} required  />

                {/* <Input id='phone' type="text" label='Mobile Number' disabled={isLoading} register={register} errors={errors} required  /> */}
                
                <InputPhoneNumberGlobal 
                    id="phone"
                    label="Mobile Phone"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    placeholder="+countryCode number"
                    onChange={onPhoneChange }
                    required
                />
            </div>
            <div className="flex items-center gap-2 z-0">
                <InputPassword id='password' type='password' label='Create Your Password' disabled={isLoading} register={register} errors={errors} required  />
                <InputPassword id='hashedPassword' type='password' label='Retype That Password' disabled={isLoading} register={register} errors={errors} required  />
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
                    <div>Already have an account </div>
                
                    <div 
                        className="text-white hover:underline hover:cursor-pointer"
                        onClick={toggleModal}>
                            Log In?
                    </div>
                    
                    <div 
                        style={{ textAlign: 'right', color: 'pink', position: 'absolute',}}
                        className="right-2 pe-5 position-absolute text-align-items-end justify-content-end d-flex cursor-pointer"
                        onClick={registerModal.onClose}>
                            Cancel
                    </div>
                
            </div>
        </div>
    );

    return (
                <Modal 
                    disabled={isLoading} 
                    isOpen={registerModal.isOpen} 
                    title="Register"
                    actionLabel={'Sign Up'}
                    onClose={registerModal.onClose}
                    onSubmit={handleSubmit(onSubmit)}
                    body={bodyContent}
                    footer={footerContent}
                />
            )
}

export default RegisterModal




// import useRegisterModal from '@/Hooks/useRegisterModal';
// import useLoginModal from '@/Hooks/useLoginModal';
// import Modal from '../Modal';

// import Heading from '../Heading';
// import Input from '@/Elements/inputs/Input';
// import InputPassword from '@/Elements/inputs/InputPassword';
// import Button from '@/Elements/Button'

// const RegisterModal = () => {





//     const toggleModal = useCallback(() => {
//         registerModal.onClose();
//         loginModal.onOpen();
//     }, [loginModal, registerModal]);



//     const footerContent = (
//         <div className='flex flex-col gap-4'>
//             <hr />
//             <Button
//                 outline
//                 label='Continue With Google'
//                 icon={FcGoogle}
//                 onClick={() => signIn('google')}
//                 //onClick={() => {console.log('Clicked Continue With Google!')}}

//             />
//             <Button
//                 outline
//                 label='Continue With Github'
//                 icon={AiFillGithub}
//                 onClick={() => signIn('github')}
//                 //onClick={() => {console.log('Clicked Continue With GitHub!')}}

//             />
//             <div className="justify-start flex flex-row items-center gap-2 text-gray-500 text-center mt-4 font-light">
//                     <div>Already have an account </div>
                
//                     <div 
//                         className="text-white hover:underline hover:cursor-pointer"
//                         onClick={toggleModal}>
//                             Log In?
//                     </div>
                    
//                     <div 
//                         style={{ textAlign: 'right', color: 'pink', position: 'absolute',}}
//                         className="right-2 pe-5 position-absolute text-align-items-end justify-content-end d-flex cursor-pointer"
//                         onClick={() => registerModal.onClose()}>
//                             Cancel
//                     </div>
                
//             </div>
//         </div>
//     );
//     
// }

// export default RegisterModal