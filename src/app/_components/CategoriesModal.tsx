"use client";

import { Badge } from '@nextui-org/react'
import { api } from 'app/trpc/react';
import React from 'react'
import { BiCategoryAlt } from 'react-icons/bi'
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import CategoriesTable from './CategoriesTable';
import CreateCategory from './CreateCategory';
import LoadingSpinner from './LoadingSpinner';

const CategoriesModal = () => {
    const { data, isLoading } = api.category.getAll.useQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    }

    if (isLoading) return <div className='flex flex-col justify-center items-center'>
        <LoadingSpinner />
        <span className='text-sm max-md:text-xs'>Categories</span>
    </div>
    return (
        <>
            <Badge content={data ? data.length : 0} color="default" className='mr-2'>
                <div onClick={handleOpen} className='flex flex-col justify-center items-center cursor-pointer text-gray-500 hover:scale-110 transition-all'>
                    <BiCategoryAlt />
                    <span className='text-sm max-md:text-xs'>Categories</span>
                </div>
            </Badge>

            <Modal
                className='dark'
                size='xl'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>

                            <ModalBody className='p-10 flex flex-col justify-center items-center'>
                                <CreateCategory />
                                <CategoriesTable />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default CategoriesModal