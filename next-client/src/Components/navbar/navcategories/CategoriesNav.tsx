"use client"

import React from 'react'

import {CategoriesProperties} from '@/Components/navbar/navcategories/CategoriesProperties'

import CategoriesBusinesses from '@/Components/navbar/navcategories/CategoriesBusinesses'

import BusinessNavDropDown from '../NavbarDropDowns/businessNavDropDown'
import PropertyNavDropDown from '../NavbarDropDowns/propertyNavDropDown'

export const propertyCategories = {

}


const CategoriesNav = () => {
  return (
    <div className='flex flex-col'>
        
            
            
            <CategoriesProperties />

            <CategoriesBusinesses />
            
            
            <div className="ms-5 flex items-start mt-5">
                <PropertyNavDropDown />
                <BusinessNavDropDown />
            </div>
        
    </div>
  )
}

export default CategoriesNav