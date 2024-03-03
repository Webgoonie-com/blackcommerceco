"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {

    const router = useRouter()

    return (
        <>
            <Image
                onClick={() => router.push('/')}
                alt="Logo Image"
                style={{width: 'auto', height: "auto"}}
                className="hidden md:block cursor-pointer"
                width={130} 
                height={130}
                src="/images/logo.png"
                priority={true}
            />
            <h5 className="xs:hidden sm:text-base block md:hidden font-bold text-white p-0 m-0">Black Commerce</h5>
        </>
    )
}

export default Logo