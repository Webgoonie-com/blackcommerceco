import { User } from '@/Types';
import React from 'react'
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import dynamic from 'next/dynamic';
import ListingBusinessCategory from '@/Components/Listings/ListingBusinessCategory';


import Map from '@/Components/maps/Map'


// This crashes when used removed on 3-26-2024 if doesn't stop crash then something else.
// const Map = dynamic(() => import('), { 
//     ssr: false 
// });


interface ListingBbBusinessInfoProps {
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
    country: string;
    countryStateRegion: string;
    countryCity: string;
}

const ListingBbBusinessInfo:React.FC<ListingBbBusinessInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
    country,
    countryStateRegion,
    countryCity,
}) => {



    const extractLatLng = (latLngString: string | undefined): [number, number] | undefined => {
        if (!latLngString) return undefined;
        const [latitude, longitude] = latLngString.split(',').map(Number);
        return [latitude, longitude];
    };
    
    // Determine the appropriate latitude and longitude values
    let center: [number, number] | undefined = undefined;
    if (countryCity) {
        center = extractLatLng(countryCity);
    } else if (countryStateRegion) {
        center = extractLatLng(countryStateRegion);
    } else if (country) {
        center = extractLatLng(country);
    }
    
    // Log latitude and longitude individually if center is defined
    if (center) {
        const [latitude, longitude] = center;
        // console.log('Latitude:', latitude);
        // console.log('Longitude:', longitude);
    }
    
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    
                   
                    <div>
                        Managed by {user?.name}

                    </div>
                    
                    <Avatar src={user?.usrImage} />

                </div>

                <div className='flex flex-row items-center gap-4 font-light text-neutral-600'>
                    {/*                     
                    <div>
                        {guestCount} # of Guest
                    </div>
                    
                    <div>
                        {roomCount} # of Rooms
                    </div>
                    
                    <div>
                        {bathroomCount} Bathrooms
                    </div>
                    */}
                   
                </div>


            </div>

            <hr />

            {category && (
                <ListingBusinessCategory
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
                    Business Decription:  
                </div>
                <div>
                    {description}
                </div>
               
            </div>

            <hr />
            
            Using Coordinates: {center}

            <Map center={center} />


        </div>
    )
}

export default ListingBbBusinessInfo