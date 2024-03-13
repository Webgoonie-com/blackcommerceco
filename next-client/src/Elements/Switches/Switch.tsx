import React, { useCallback, useState  } from 'react';
import ReactSwitch from "react-switch";

interface SwitchProps {
    posCnt: number;
    title: string;
    subtitle: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({posCnt, title, subtitle, onChange }) => {

    const [checked, setChecked] = useState(false);
    
    const onSwitch = useCallback(() => {
        setChecked(!checked); // Toggle the value
        onChange(checked);
    }, [onChange, checked]);


    

    return (

        <div className="flex flex-row  items-center p-3">
            <div className="w-1/2 py-4 mr-5">
                ({posCnt}). {title}
            </div>
            <div className="w-1/4 items-center py-4">
                <ReactSwitch
                    onChange={onSwitch}
                    checked={checked}
                    className="react-switch"
                />

                <span className='absolute mb-2 ml-2'>{checked ? "Yes" : "No"}</span>
            </div>
            <div className="hidden lg:block md:block xl:block md:w-1/4 py-4">
                <small>({subtitle})</small>
            </div>
        </div>

    );
};

export default Switch;
