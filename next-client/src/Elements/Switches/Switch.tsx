import React, { useState, useEffect } from 'react';
import ReactSwitch from "react-switch";

interface SwitchProps {
    id: string;
    posCnt: number;
    title: string;
    subtitle: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    register: any;
    errors: any;
}

const Switch: React.FC<SwitchProps> = ({
    id, 
    posCnt, 
    title, 
    subtitle, 
    checked,
    onChange,
    register,
    errors
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        setIsChecked(checked || false); // Ensure it's always a boolean
    }, [checked]);

    const onSwitch = (value: boolean) => {
        setIsChecked(value);
        onChange(value);
    };

    return (
        <div className="flex flex-row items-center p-3">
            <div className="w-1/2 py-4 mr-5">
                ({posCnt}). {title}
            </div>
            <div className="w-1/4 items-center py-4">
                <ReactSwitch
                    id={id}
                    onChange={onSwitch}
                    checked={isChecked}
                    className="react-switch"
                />
                <span className='absolute mb-2 ml-2'>{isChecked ? "Yes" : "No"}</span>
            </div>
            <div className="hidden lg:block md:block xl:block md:w-1/4 py-4">
                <small>({subtitle})</small>
            </div>
        </div>
    );
};

export default Switch;
