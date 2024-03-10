"use client"

import { api } from 'app/trpc/react';
import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import NotFoundInfo from './NotFoundInfo';
import { Button } from '@nextui-org/react';

const GetCategories = () => {
    const { data, isLoading} = api.category.getAll.useQuery();
    if(isLoading) return <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <LoadingSpinner/>  </div>
    if(data && data.length ===0) return  <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <NotFoundInfo content={'Category not found.'}/> </div>  
    return (
        <>
            {
                data?.map(
                    (category) => (
                        <Button key={category.id} className='bg-gray-50 rounded-full flex items-center justify-center min-h-[50px] min-w-[200px] max-h-[50px] 
                        max-w-[200px]  text-black cursor-pointer transition-all'>
                            <span className='w-full overflow-auto justify-center text-center'>
                                {category.name}
                            </span>
                        </Button>
                    ))
            }
        </>
    )
}

export default GetCategories