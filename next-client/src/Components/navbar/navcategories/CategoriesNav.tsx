"use client"

import React from 'react'

import {CategoriesProperties} from '@/Components/navbar/navcategories/CategoriesProperties'

import Container from '@/Components/Container'

import CategoriesBusinessesBox from '@/Components/navbar/navcategories/CategoriesBusinesses'

export const propertyCategories = {

}


const CategoriesNav = () => {
  return (
    <div className='w-full flex flex-row'>
        <div className='w-full pt-4 flex flex-row'>
            
            
            <CategoriesProperties />

            <CategoriesBusinessesBox />
            
        </div>
    </div>
  )
}

export default CategoriesNav