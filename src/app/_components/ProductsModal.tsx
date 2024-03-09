"use client";

import { Badge } from '@nextui-org/react'
import React from 'react'
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import CategoriesTable from './CategoriesTable';
import CreateCategory from './CreateCategory';
import { FaBox } from 'react-icons/fa';
import CreateProduct from './CreateProduct';

const ProductsModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    }


    return (
        <>
            <Badge content={0} color="default">
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