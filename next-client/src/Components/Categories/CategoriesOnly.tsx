import React, { useCallback, useState } from 'react'

import { IoDiamond } from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import { FaHandsWash, FaSkiing } from 'react-icons/fa'
import { TbBeach, TbChevronDown, TbMountainOff, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill, GiVillage, GiRingmaster, GiHomeGarage  } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'

import { CiCloudMoon, CiForkAndKnife, CiGift, CiMedicalCase } from 'react-icons/ci'
import { ImHappy } from 'react-icons/im'
import { FaHotTubPerson, FaScrewdriverWrench, FaTruckPlane, FaTruckRampBox } from 'react-icons/fa6'

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

export const  CategoriesOnlyBusinesses = [
    {
        label: 'Dinning',
        icon: CiForkAndKnife,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Shopping',
        icon: CiGift,
        description: 'For Shopping businesses and services!'
    },
    {
        label: 'NightLife',
        icon: CiCloudMoon,
        description: 'For Night Entertainment & NightLife Lifestyle(s)!'
    },
    {
        label: 'Tours',
        icon: GiRingmaster,
        description: 'For Tours And Tour Guides businesses and services!'
    },
    {
        label: 'Activities',
        icon: ImHappy,
        description: 'Fun Activities Even For The Family!'
    },
    {
        label: 'Beauty',
        icon: FaHandsWash,
        description: 'For Beauty, Makeup And Nails businesses and services!'
    },
    {
        label: 'Spas',
        icon: FaHotTubPerson,
        description: 'For Spas And message businesses and services!!'
    },
    {
        label: 'AutoMotive',
        icon: FaScrewdriverWrench,
        description: 'For Automotive related businesses and services!'
    },
    {
        label: 'Transporation',
        icon: FaTruckRampBox,
        description: 'For Transporation related businesses and services!'
    },
    {
        label: 'Travel',
        icon: FaTruckPlane,
        description: 'For Travel businesses and services!'
    },
    {
        label: 'HomeServices',
        icon: GiHomeGarage,
        description: 'For Home related businesses and services!'
    },
    {
        
        label: 'Medical',
        icon: CiMedicalCase,
        description: 'Medical Related business and services!'
    },
    
]

