'use client'

import React from 'react'
import CreateCategory from './CreateCategory'
import GetCategories from './GetCategories'
const Categories = () => {

    return (
        <div className="max-h-full min-h-[85px] flex flex-col max-md:items-start max-md:flex-row gap-4 items-center  min-w-[200px] overflow-auto  max-md:py-2">
            <CreateCategory />
            <GetCategories />
        </div>
    )
}

export default Categories