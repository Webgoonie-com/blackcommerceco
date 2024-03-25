import useCountries from '@/Hooks/useCountries';
import { User } from '@/Types';
import React from 'react'
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingPropertyCategory from './ListingPropertyCategory';
import dynamic from 'next/dynamic';


const Map = dynamic(() => import('@/Components/maps/Map'), { 
    ssr: false 
});

interface ListingBapPropertyInfoProps {
    user: User;
    description:string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType,
        label: string;
        description: string;
    } | undefined;
    locationValue: string;
}

const ListingBapPropertyInfo:React.FC<ListingBapPropertyInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
}) => {

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng
    
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    
                   
                    <div>
                        Hosted by {user?.name}

                    </div>
                    4
                    <Avatar src={user?.usrImage} />

                </div>

                <div className='flex flex-row items-center gap-4 font-light text-neutral-600'>
                    
                    <div>
                        {guestCount} # of Guest
                    </div>
                    
                    <div>
                        {roomCount} # of Rooms
                    </div>
                    
                    <div>
                        {bathroomCount} Bathrooms
                    </div>
                   
                   
                </div>


            </div>

            <hr />

            {category && (
                <ListingPropertyCategory
                    icon={category?.icon}
                    label={category?.label}
                    description={category?.description}
                />
            )}

            <hr />

            <div
                className="text-lg font-light text-neutral-500"
            >
                <div>
                    Property Decription:  
                </div>
                <div>
                    {description}
                </div>
               
            </div>

            <hr />
            
            <Map center={coordinates} />


        </div>
    )
}

export default ListingBapPropertyInfo