'use client'

import React from "react";
import { useRouter } from "next/navigation"

import Button from "@/Elements/Button";
import ModalHeading from "@/Components/modals/ModalHeading";

interface EmptyStateBbProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyStateBb: React.FC<EmptyStateBbProps> = ({
    title = "No exact business matches were found at the moment...",
    subtitle = "Try changing or removing some of your business categories",
    showReset

}) => {
    
    const router = useRouter();

    return (
        <div
            className="h=[60vh] flex flex-col gap-2 justify-center items-center bg-gray-950"
        >
            
        <ModalHeading
            center
            title={title}        
            subtitle={subtitle}
        />
        <div className="w-48 mt-4 md:mt-20 xl:mt-20">
            {showReset && (
                <Button
                    outline
                    label={"Remove all Fliters"} 
                    onClick={() => router.push('/')}
                />
            )}

        </div>
            
        
            Empty Results... 
        </div>

    )
}

export default EmptyStateBb