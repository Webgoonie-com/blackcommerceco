"use client"

import React from 'react'
//import CategoriesProperties from './CategoriesProperties'
import PropertyCategoriesBox from '@/Components/Categories/PropertyCategories'
import Container from '@/Components/Container'
import CategoriesBusinessesBox from '@/Components/Categories/BusinessCategories'

export const propertyCategories = {

}


const CategoriesNav = () => {
  return (
    <div className='w-full flex flex-row'>
        <div className='w-full pt-4 flex flex-row'>
            
            
            <PropertyCategoriesBox />

            <CategoriesBusinessesBox />
            
        </div>
    </div>
  )
}

export default CategoriesNav