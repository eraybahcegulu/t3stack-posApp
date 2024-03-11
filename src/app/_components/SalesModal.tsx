"use client";

import { Badge } from '@nextui-org/react'
import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import LoadingSpinner from './LoadingSpinner'
import { api } from 'app/trpc/react'

const SalesModal = () => {
    const { data, isLoading } = api.order.getAll.useQuery();

    if (isLoading) return <div className='flex flex-col justify-center items-center'>
        <LoadingSpinner />
        <span className='text-sm max-md:text-xs'>Sales</span>
    </div>
    return (
        <Badge content={data ? data.length : 0} color="default">
            <div className='flex flex-col justify-center items-center cursor-pointer text-green-700 hover:scale-110 transition-all'>
                <BsCurrencyDollar />
                <span className='text-sm max-md:text-xs'>Sales</span>
            </div>
        </Badge>
    )
}

export default SalesModal