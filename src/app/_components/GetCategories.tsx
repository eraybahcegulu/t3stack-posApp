"use client"

import { api } from 'app/trpc/react';
import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import NotFoundInfo from './NotFoundInfo';
import { Button } from '@nextui-org/react';
import { useCategoryStore } from '../zustand/categoryStore';

const GetCategories = () => {
    const { setCategoryId } = useCategoryStore();
    const { categoryId } = useCategoryStore();
    const { data, isLoading } = api.category.getAll.useQuery();
    if (isLoading) return <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <LoadingSpinner />  </div>
    if (data && data.length === 0) return <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <NotFoundInfo content={'Category not found.'} /> </div>
    return (
        <>
            <Button color="secondary" variant={categoryId === '' ? "solid" : "bordered"}  onClick={() => setCategoryId('')}
                className='text-white rounded-full flex items-center justify-center min-h-[50px] min-w-[200px] max-h-[50px] 
                        max-w-[200px]  cursor-pointer transition-all'>
                <span className='w-full overflow-auto justify-center text-center'>
                    ALL PRODUCTS
                </span>
            </Button>
            {
                data?.map(
                    (category) => (
                        <Button color="secondary" variant={categoryId === category.id.toString() ? "solid" : "bordered"} onClick={() => setCategoryId(category.id.toString())} key={category.id}
                            className='text-white rounded-full flex items-center justify-center min-h-[50px] min-w-[200px] max-h-[50px] 
                        max-w-[200px] cursor-pointer transition-all'>
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