"use client"

import { api } from 'app/trpc/react';
import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import NotFoundInfo from './NotFoundInfo';

const GetCategories = () => {
    const { data, isLoading} = api.category.getAll.useQuery();
    if(isLoading) return <LoadingSpinner/> 
    if(data && data.length ===0) return  <NotFoundInfo name={'Category'}/>  
    return (
        <>
            {
                data?.map(
                    (category) => (
                        <div key={category.id} className='bg-gray-50 rounded-full flex items-center justify-center min-h-[60px] min-w-[150px] max-h-[50px] 
                        max-w-[150px] overflow-auto text-black hover:scale-110 cursor-pointer  transition-all'>
                            <span className='w-full justify-center text-center'>
                                {category.name}
                            </span>
                        </div>
                    ))
            }
        </>
    )
}

export default GetCategories