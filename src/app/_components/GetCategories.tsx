"use client"

import { api } from 'app/trpc/react';
import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import NotFoundInfo from './NotFoundInfo';
import { Button } from '@nextui-org/react';

const GetCategories = () => {
    const { data, isLoading} = api.category.getAll.useQuery();
    if(isLoading) return <LoadingSpinner/> 
    if(data && data.length ===0) return  <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'><NotFoundInfo name={'Category'}/> </div>  
    return (
        <>
            {
                data?.map(
                    (category) => (
                        <Button key={category.id} className=' bg-gradient-to-tr from-white to-yellow-100 
                        text-black flex items-center justify-center 
                        min-h-[60px] min-w-[150px] max-h-[50px] 
                        max-w-[150px] overflow-auto hover:scale-110 cursor-pointer transition-all'
                        radius='full' variant="shadow">
                            <span className='w-full justify-center text-center'>
                                {category.name}
                            </span>
                        </Button>
                    ))
            }

        </>
    )
}

export default GetCategories