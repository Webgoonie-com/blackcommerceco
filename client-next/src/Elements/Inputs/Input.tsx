'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from 'react-icons/bi';

interface InputProps {
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

const Input : React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    placeholder,
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return (
        <div className="w-full relative px-2">
            {formatPrice && (<BiDollar size={24} className="text-gray-200 absolute top-5 left-2" />)}
            <input 
                id={id} 
                disabled={disabled} 
                {...register(id, { required })} 
                //placeholder={placeholder}
                placeholder=" "
                type={type}
                className={`peer w-full pt-4 p-4 sm:pt-5 sm:p-5 md:pt-5 md:p-5 font-light bg-gray-900 border-2
                            duration-20 focus:outline-none rounded-md outline-none text-white
                            transition disabled:opacity-70 disabled:cursor-not-allowed 
                            ${formatPrice ? 'pl-9' : 'pl-4'}
                            ${errors[id] ? 'border-rose-500' : 'border-gray-800'}
                            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-gray-500'}
                `}      
            />
            <label 
                htmlFor={id} 
                className={`absolute font-small duration-150 origin-[0]
                            transform -translate-y-3 mt-4 p-0 z-10 
                            ${formatPrice ? 'left-9' : 'left-4'}
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-4
                            ${errors[id] ? 'text-rose-500' : 'text-zinc-500'}
                `}>
                    {label}
            </label>
        </div>
    )
}
export default Input