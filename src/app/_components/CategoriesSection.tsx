'use client'

import React from 'react'
import CreateCategory from './CreateCategory'
import GetCategories from './GetCategories'

const CategoriesSection = () => {
    return (
        <div className="max-h-full pb-4 bg-gradient-to-tr from-[#242222] to-[#020202] rounded-2xl  min-h-[100px] flex flex-col justify-start max-md:items-center max-md:flex-row gap-4 items-center  min-w-[250px] overflow-auto  max-md:py-4">
            <CreateCategory />
            <GetCategories />
        </div>
    )
}

export default CategoriesSection