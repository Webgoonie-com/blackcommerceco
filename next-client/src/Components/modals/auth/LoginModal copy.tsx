'use client';


import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from 'react';
import { FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useLoginModal from '@/Hooks/useLoginModal';
import useRegisterModal from '@/Hooks/useRegisterModal';
import Modal from '../Modal';

import Heading from '../ModalHeading';
import Input from '@/Elements/Inputs/Input';
import InputPassword from '@/Elements/Inputs/InputPassword';
import Button from '@/Elements/Button'



const LoginModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);




	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		
			signIn('credentials', {
				...data,
				redirect: false
			}).then((callback) => {
				
				setIsLoading(false);
				
				if (callback?.error) {
					toast.error(callback.error)
				} else if (callback?.ok) {
					toast.success('Logged in successfully')
					router.refresh()
					loginModal.onClose()
					reset()
					// router.push('/admin/dashboard')
				}
				
			})
		
	};

	const toggleModal = useCallback(() => {
		loginModal.onClose()
		registerModal.onOpen()
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<div className="row position-absolute">
				<Heading
					title={'Welcome Back!'}
					subtitle='Fill in the required details below to login to your account'
				/>
			</div>

			<Input
				id='email'
				type='email'
				label='Your Email...'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<InputPassword
				id='password'
				type={'password'}
				label='Enter Your Password...'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			

		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4'>
			<hr />
			<Button
				outline
				label='Continue With Google'
				icon={FcGoogle}
				//onClick={() => signIn('google')}
				onClick={() => { console.log('Clicked Continue With Google!') }}

			/>
			<Button
				outline
				label='Continue With Github'
				icon={AiFillGithub}
				//onClick={() => signIn('github')}
				onClick={() => { console.log('Clicked Continue With GitHub!') }}

			/>
			<div className="inline-block text-gray-500 gap-3 mt-4 font-light sm:fs-1">
				<span className="mr-4">First time?
				</span>
				<span
					className="inline-block text-white hover:underline hover:cursor-pointer sm:fs-1"
					onClick={toggleModal}> Create An Account...
				</span>
				<div
					style={{ textAlign: 'right', color: 'pink', position: 'absolute', }}
					className="inline-block right-2 pe-5 position-absolute sm:relative text-align-items-end justify-content-end d-flex cursor-pointer"
					onClick={() => loginModal.onClose()}>
					Cancel
				</div>
			</div>
		</div>
	);


}

export default LoginModal;