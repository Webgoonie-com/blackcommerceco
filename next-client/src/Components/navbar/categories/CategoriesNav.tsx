"use client"

import React from 'react'
import CategoriesProperties from './CategoriesProperties'
import Container from '@/Components/Container'
import CategoriesBusinesses from './CategoriesBusinesses'

export const propertyCategories = {

}


const CategoriesNav = () => {
  return (
    <div className='w-full flex flex-row'>
        <div className='w-full pt-4 flex flex-row'>
            
            
            <CategoriesProperties />

            <CategoriesBusinesses />
            
        </div>
    </div>
  )
}

export default CategoriesNav