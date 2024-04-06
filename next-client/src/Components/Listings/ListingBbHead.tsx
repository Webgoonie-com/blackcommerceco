"use client"

import useCountries from "@/Hooks/useCountries";
import { currentUser, User } from "@/Types";
import ModalHeading from "../modals/ModalHeading";
import Heading from "../Heading";
import Image from 'next/image';
import HearticonBusinessButton from '@/Elements/Icons/HeartIconButton/HearticonBusinessButton';
import useCountryStateZip from "@/Hooks/useCountryStateZip";

interface ListingBbHeadProps {
    id: any;
    title: string;
    locationValue: string;
    imageSrc: string | null;
    currentUser: currentUser;
    country: string | null;
    countryStateRegion: string | null;
    countryCity: string | null;
}

const ListingBbHead: React.FC<ListingBbHeadProps> = ({
    id,
    title,
    locationValue,
    imageSrc,
    currentUser,
    country,
    countryStateRegion,
    countryCity
}) => {
    
    //  const { getByValue } = useCountries();
    // const { getByValue } = useCountryStateZip();
    
    // console.log('locationValue', locationValue)

    // const location = getByValue(locationValue)

    // console.log('after locationValue location', location)

    return ( 
        <div className="relative mt-10">

            <Heading 
                title={title}
                subtitle={`${country}, ${countryStateRegion}, ${countryCity}`}
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
                        <HearticonBusinessButton 
                            businessUUId={id}
                            currentUser={currentUser as any}
                            />
                    </div>

                </div>

        </div>
     );
}
 
export default ListingBbHead;