import React, { useCallback, useState } from 'react'

import { IoDiamond } from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach, TbChevronDown, TbMountainOff, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill, GiVillage  } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '@/Components/CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { BiPlus } from 'react-icons/bi'
import Link from 'next/link'

export const CategoriesOnlyProperties = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Luxury',
        icon: IoDiamond,
        description: 'This property is luxurious!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Village',
        icon: GiVillage,
        description: 'This property is in a village (rural)!'
    },
    {
        label: 'Countryside',
        icon: TbMountainOff,
        description: 'This property is in the country side (rural)!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Sking',
        icon: FaSkiing,
        description: 'This property is close to a lake!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is in a castle!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities!'
    },
    {
        label: 'Artic',
        icon: BsSnow,
        description: 'This property has snow activities!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property has in a cave!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barn',
        icon: GiBarn,
        description: 'This property is in or has a barn!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has Windmills!'
    },
    
    
    
]
