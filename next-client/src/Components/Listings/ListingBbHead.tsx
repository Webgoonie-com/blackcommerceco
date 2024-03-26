"use client"

import useCountries from "@/Hooks/useCountries";
import { currentUser, User } from "@/Types";
import ModalHeading from "../modals/ModalHeading";
import Heading from "../Heading";
import Image from 'next/image';
import HeartIconButton from '@/Elements/Icons/HeartIconButton';

interface ListingBbHeadProps {
    id: number;
    title: string;
    locationValue: string;
    imageSrc: string | null;
    currentUser: currentUser;
}

const ListingBbHead: React.FC<ListingBbHeadProps> = ({
    id,
    title,
    locationValue,
    imageSrc,
    currentUser
}) => {
    
    const { getByValue } = useCountries();

    const location = getByValue(locationValue)

    return ( 
        <div className="relative mt-10">

            <Heading 
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />

                <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                    <Image
                        priority
                        alt="Image"
                        src={imageSrc || ""}
                        fill
                        className="object-cover w-full"
                    />

                    <div className="absolute top-5 right-5">
                        <HeartIconButton 
                            listingId={id}
                            currentUser={currentUser as any}
                            />
                    </div>

                </div>

        </div>
     );
}
 
export default ListingBbHead;