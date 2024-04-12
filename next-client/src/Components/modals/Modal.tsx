'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io';
import Button from "@/Elements/Button";
import './Modal.css'

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
	wide?: boolean,
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal : React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
	wide,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if(disabled) return;

		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if(disabled) return;

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if(disabled || !secondaryAction) return;

		secondaryAction();
	}, [disabled, secondaryAction]);

	if(!isOpen) return null;

    return (
        <>
			<div id="ModalCss" className="
                justify-center 
                items-center 
                flex 
                overflow-x-hidden 
                overflow-y-auto 
                fixed
                inset-0 
                z-[900] 
                outline-none 
                focus:outline-none
                bg-gray-800/70
                "
                >
                    {/* Actual Display */}
                  <div className={`
                            relative 
                            w-[90%]
                            my-6 
                            mx-auto 
                            h-full 
                            lg:h-auto 
                            md:h-auto
                            z-[900] 
                    `}>
                     
                     {/* Content */}
                     <div className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ?   `translate-y-0` : 'translate-y-full'}
                        ${showModal ?   `opacity-100` : 'opacity-0'}

                     `}>


                        {/* Visiblity */}
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                            
                            
                            {/* Header */}
                            <div className="flex items-center text-white p-6 rounded-t justify-center relative border-b-[1px]">
                                

                                <button
                                    onClick={handleClose}
                                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                                    >
                                    
                                    <IoMdClose size={18} />

                                </button>

                                <div className="text-lg font-semibold">
                                    {title}
                                </div>



                            </div>

                            {/* Body */}

                            <div className="relative z-50 p-6 flex-auto">
                                {body}
                            </div>

                            {/* Footer */}

                            <div className="flex flex-col bottom-0 gap-2 p-5">
                                
                                <div className="flex flex-row items-center gap-4 w-full">
                                    
                                    {secondaryAction &&  secondaryActionLabel && 
                                    (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}
                                    

                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />

                                </div>

                                <div className="flex flex-col bottom-0 mt-5">
                                    {footer}
                                </div>


                            </div>

                        </div>




                     </div>



                  </div>

			</div>
		</>
    )
}
export default Modal