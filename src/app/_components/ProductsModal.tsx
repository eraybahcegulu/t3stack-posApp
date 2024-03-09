"use client";

import { Badge } from '@nextui-org/react'
import React from 'react'
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'

import { FaBox } from 'react-icons/fa';
import CreateProduct from './CreateProduct';
import { api } from 'app/trpc/react';
import LoadingSpinner from './LoadingSpinner';

const ProductsModal = () => {
    const { data, isLoading } = api.product.getAll.useQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    }

    if (isLoading) return <div className='flex flex-col justify-center items-center'>
        <LoadingSpinner />
        <span className='text-sm max-md:text-xs'>Products</span>
    </div>

    return (
        <>
            <Badge content={data ? data.length : 0} color="default">
                <div onClick={handleOpen} className='flex flex-col justify-center items-center cursor-pointer text-violet-500 hover:scale-110 transition-all'>
                    <FaBox />
                    <span className='text-sm max-md:text-xs'>Products</span>
                </div>
            </Badge>

            <Modal
                className='dark'
                size='2xl'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>

                            <ModalBody className='p-10 flex flex-col justify-center items-center'>
                                <CreateProduct />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductsModal