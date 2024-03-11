"use client"

import { api } from 'app/trpc/react';
import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import NotFoundInfo from './NotFoundInfo';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import CreateProduct from './CreateProduct';
import { useSearchStore } from '../zustand/searchStore'
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux-toolkit/cartSlice";
import { useCategoryStore } from '../zustand/categoryStore';

const GetProducts = () => {
    const { data, isLoading } = api.product.getAll.useQuery();
    const { text } = useSearchStore();
    const { categoryId } = useCategoryStore();
    const dispatch = useDispatch();

    if (isLoading) return <div className='h-full w-full flex justify-center items-center'> <LoadingSpinner />  </div>
    if (data && data.length === 0) return <div className='min-w-[150px] min-h-[60px] flex flex-col justify-center items-center'>
        <NotFoundInfo content={'Product not found.'} />
        <CreateProduct />
    </div>

    const filteredProducts = data?.filter((product) =>
        product.name.toLowerCase().includes(text.trim().toLowerCase()) &&
        (categoryId === ''|| product.categoryId === parseInt(categoryId))
    );

    return (
        <div className='grid grid-cols-card gap-8'>
            <div className='h-[200px] rounded-xl flex justify-center items-center bg-gradient-to-tr from-[#302e2e] to-[#020202]' >
                <CreateProduct />
            </div>
            {
                filteredProducts?.map(
                    (product) => (
                        <Card onClick={() => dispatch(addToCart(product))} key={product.id} shadow="sm" isPressable className='h-[200px] hover:scale-105 dark'>
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
                                <p className="text-default-500">€{product.price}</p>
                            </CardFooter>
                        </Card>
                    ))
            }
        </div>
    )
}

export default GetProducts;
