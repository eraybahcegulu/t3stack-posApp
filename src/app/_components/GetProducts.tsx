"use client"

import { api } from 'app/trpc/react';
import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import NotFoundInfo from './NotFoundInfo';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

const GetProducts = () => {
    const { data, isLoading } = api.product.getAll.useQuery();
    if (isLoading) return <div className='h-full w-full flex justify-center items-center'> <LoadingSpinner />  </div>
    if (data && data.length === 0) return <div className='min-w-[150px] min-h-[60px] flex justify-center items-center'> <NotFoundInfo content={'Product not found.'} /> </div>
    return (
        <div className='grid grid-cols-card gap-8'>
            {
                data?.map(
                    (product) => (
                        <Card key={product.id} shadow="sm" isPressable className='h-[200px] hover:scale-105 dark' >
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={product.name}
                                    className="w-full object-cover h-[150px]"
                                    src={product.image}
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <b>{product.name}</b>
                                <p className="text-default-500">${product.price}</p>
                            </CardFooter>
                        </Card>
                    ))
            }
        </div>
    )
}

export default GetProducts