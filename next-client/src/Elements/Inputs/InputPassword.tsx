'use client';

import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from 'react-icons/bi';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';



interface InputPasswordProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const InputPassword : React.FC<InputPasswordProps> = ({
    id,
    label,
    placeholder,
    disabled,
    required,
    register,
    errors,
}) => {

    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    };
    
    return (
        <div className="w-full relative px-2">
            
            <input 
                id={id} 
                disabled={disabled} 
                {...register(id, { required })} 
                placeholder={placeholder}
                type={isPasswordVisible ? 'text' : 'password'}
                className={`peer w-full pt-4 p-4 sm:pt-5 sm:p-5 md:pt-5 md:p-5 font-light bg-gray-900 border-2
                            duration-20 focus:outline-none rounded-md outline-none text-white
                            transition disabled:opacity-70 disabled:cursor-not-allowed 
                            pl-4
                            ${errors[id] ? 'border-rose-500' : 'border-gray-800'}
                            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-gray-500'}
                `}      
            />
            <label 
                htmlFor={id} 
                className={`absolute font-small duration-150 origin-[0]
                            transform -translate-y-3 mt-3 p-0 z-10 
                            left-4
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-4
                            ${errors[id] ? 'text-rose-500' : 'text-zinc-500'}
                `}>
                    {label}
            </label>
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-5 right-4 cursor-pointer me-2 text-zinc-500"
            >
                {isPasswordVisible ? (<BsEyeFill size={24} />) : (<BsEyeSlashFill size={24} />)}
            </button>
        </div>
    )
}
export default InputPassword