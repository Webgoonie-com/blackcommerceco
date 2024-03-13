'use client'

import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;

}
const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {

    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }

        onChange(value - 1)

    }, [onChange, value]);

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">{title}</div>
                <div className="font-light text-gray-400">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 text-white">
                <div
                    onClick={onReduce}
                    className="
                    w-10
                    h-10
                    rounded-full
                    border-[1px]
                    border-white-400
                    flex
                    items-center
                    justify-center
                    text-white-400
                    cursor-pointer
                    hover:opacity-80
                    transition
                "
                >
                    <AiOutlineMinus
                        className="
                        font-light 
                        text-xl 
                        text-white
                    "
                    />
                </div>
                <div
                    className="
                    font-light 
                    text-xl 
                    text-white-600
                "
                >
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="
                    w-10
                    h-10
                    rounded-full
                    border-[1px]
                    border-white-400
                    flex
                    items-center
                    justify-center
                    text-neutral-600
                    cursor-pointer
                    hover:opacity-80
                    transition
                "
                >
                    <AiOutlinePlus
                        className="
                        font-light 
                        text-xl 
                        text-white
                    "
                    />
                </div>
            </div>
        </div>
    );
}

export default Counter