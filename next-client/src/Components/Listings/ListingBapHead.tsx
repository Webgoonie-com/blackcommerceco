"use client"

import useCountries from "@/Hooks/useCountries";
import { currentUser, User } from "@/Types";
import ModalHeading from "../modals/ModalHeading";
import Heading from "../Heading";
import Image from 'next/image';
import HearticonPropertyButton from '@/Elements/Icons/HeartIconButton/HearticonPropertyButton';

import logo from '../../../public/images/logo.png'

const logoPlaceHolder = `${process.env.NEXT_PUBLIC_URL}` + logo.src

interface ListingHeadProps {
    id: number;
    title: string;
    locationValue: string;
    imageSrc: string | null;
    currentUser: currentUser;
    country: string | null;
    countryStateRegion: string | null;
    countryCity: string | null;
}

const ListingBapHead: React.FC<ListingHeadProps> = ({
    id,
    title,
    locationValue,
    imageSrc,
    currentUser,
    country,
    countryStateRegion,
    countryCity

}) => {


    // console.log('Pased id as listingId: = ', id)
    // console.log('Pased country as: = ', country)

    const { getByValue } = useCountries();

    const location = getByValue(locationValue)

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
                        src={imageSrc || logoPlaceHolder}
                        fill
                        className="object-cover w-full"
                    />

                    <div className="absolute top-5 right-5">
                        <HearticonPropertyButton 
                            listingId={id}
                            currentUser={currentUser as any}
                            />
                    </div>

                </div>

        </div>
     );
}
 
export default ListingBapHead;