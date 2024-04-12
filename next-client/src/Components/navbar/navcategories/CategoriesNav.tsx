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
            
            
            <div className={
                `
                flex 
                items-start 
                mt-5 
                xl:px-20
                md:px-10
                md:ms-5
                md:mx-auto
                sm:px-0
                px-0
                overflow-y-visible
                `
                }>
                <PropertyNavDropDown />
                <BusinessNavDropDown />
            </div>
        
    </div>
  )
}

export default CategoriesNav