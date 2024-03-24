"use client"

import useCountries from "@/Hooks/useCountries";
import { User } from "@/Types";
import ModalHeading from "../modals/ModalHeading";

interface ListingHeadProps {
    Id: number;
    title: string;
    locationValue: string;
    imageSrc: string | null;
    currentUser?: User | null;
}

const ListingBapHead: React.FC<ListingHeadProps> = ({
    Id,
    title,
    locationValue,
    imageSrc,
    currentUser
}) => {
    
    const { getByValue } = useCountries();

    const location = getByValue(locationValue)

    return ( 
        <div>
            <ModalHeading 
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
        </div>
     );
}
 
export default ListingBapHead;